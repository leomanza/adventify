import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'
import Header from '../Header'
import mapStyles from './mapStyles'
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { UserStore } from '@/stores/user.store'
import axios from 'axios'
import MintedModal from '@/components/MintedModal'
import useUserPlaces from '@/hooks/getUserPlaces'
import { resolveIPFSUrl } from '@/utils/resolveIPFSUrl'

type LatLngLiteral = google.maps.LatLngLiteral
type Map = google.maps.Map

const mapContainerStyle = {
  height: '100vh',
  width: '100vw',
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

interface IMarkSelection {
  lat: number
  lng: number
  placeId: string
  description: string
}
export default function Map() {
  const user = UserStore((state) => state.user)
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState<IMarkSelection>()
  const [lat, setLat] = useState<number>()
  const [lng, setLng] = useState<number>()
  const [minting, setIsMinting] = useState(false)
  const { data: userMakers } = useUserPlaces()

  const [mintedInfo, setMintedInfo] = useState<null | {
    imageUrl: string
    metadataUrl: string
    tokenId: number
  }>(null)

  const setPosition = (position: any) => {
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)
  }

  const mapRef = useRef<Map>()

  const onLoad = useCallback((map: Map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng, placeId, description }: IMarkSelection) => {
    mapRef.current?.panTo({ lat, lng })
    setSelected({ lat, lng, placeId, description })
  }, [])

  const center = useMemo(() => ({ lat: -3.745, lng: -38.523 }), [lat, lng])

  const onClickMint = async () => {
    setIsMinting(true)
    // 👇 Send a fetch request to Backend API.
    try {
      const response = await axios.post('/api/place/mint', {
        userId: user?.email,
        placeId: selected?.placeId,
      })
      setMintedInfo(response.data.data)
      setSelected(undefined)
      setIsMinting(false)
    } catch (error) {
      setIsMinting(false)
    }
  }

  useEffect(() => {
    async function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition)
      } else {
        alert('Geolocation is not supported by this browser.')
      }
    }
    getLocation()
  })

  return (
    <div>
      <Header panTo={panTo} />
      <div className="map">
        <GoogleMap
          zoom={3}
          center={center}
          mapContainerStyle={mapContainerStyle}
          options={options}
          onLoad={onLoad}
        >
          {userMakers?.data
            .filter((place) => place.location)
            .map((place) => {
              console.log(place.location?.latitude)
              console.log(place.location?.longitude)

              return (
                <Marker
                  key={`${place.id}`}
                  position={{ lat: place.location!.latitude, lng: place.location!.longitude }}
                  title={place.name}
                  icon={{
                    url: resolveIPFSUrl(place.imageUrl),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(50, 50),
                  }}
                />
              )
            })}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(undefined)
              }}
            >
              <Flex align="center">
                <Text>
                  Collect this place! <strong>{selected.description}</strong>{' '}
                </Text>

                <Button colorScheme="red" onClick={onClickMint} ml={3}>
                  {!minting ? 'Mint!' : 'Minting...'}
                </Button>
              </Flex>
            </InfoWindow>
          ) : null}
        </GoogleMap>
        {mintedInfo && <MintedModal {...mintedInfo} closeModal={() => setMintedInfo(null)} />}
      </div>
    </div>
  )
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
}
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
}
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
}
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
}

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = []
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    })
  }
  return _houses
}
