import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  InfoWindow,
} from '@react-google-maps/api'
import { formatRelative } from 'date-fns'
import Search from '../Search'
import Header from '../Header'
import mapStyles from './mapStyles'
type LatLngLiteral = google.maps.LatLngLiteral
type DirectionsResult = google.maps.DirectionsResult
type MapOptions = google.maps.MapOptions
import { useDisclosure } from '@chakra-ui/react'
import ConfirmMint from './ConfirmMint'

export default function Map() {
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [lat, setLat] = useState<number>()
  const [lng, setLng] = useState<number>()

  const setPosition = (position: any) => {
    var lat = position.coords.latitude
    var lng = position.coords.longitude
    setLat(lat)
    setLng(lng)
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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onConfirmMint = () => {
    // call apu/mintPlace
    onClose()
  }

  const onMapClick = useCallback((e: any) => {
    console.log('place', e)
    onOpen()

    // setMarkers((current) => [
    //   ...current,
    //   {
    //     lat: e.latLng.lat(),
    //     lng: e.latLng.lng(),
    //     time: new Date(),
    //   },
    // ])
  }, [])
  const mapRef = useRef<GoogleMap>()

  const onLoad = useCallback((map) => (mapRef.current = map), [])
  const panTo = useCallback(({ lat, lng }: { lat: number; lng: number }) => {
    mapRef.current?.panTo({ lat, lng })
    mapRef.current?.setZoom(14)
  }, [])
  const center = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng])
  const mapContainerStyle = {
    height: '100vh',
    width: '100vw',
  }
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  }
  return (
    <div>
      <Header panTo={panTo} />
      <ConfirmMint onClose={onClose} onOpen={onOpen} isOpen={isOpen} onConfirm={onConfirmMint} />
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={mapContainerStyle}
          options={options}
          onLoad={onLoad}
          onClick={onMapClick}
        >
          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker)
              }}
              icon={{
                url: `/marker.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          ))}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null)
              }}
            >
              <div>
                <h2>
                  <span role="img" aria-label="bear">
                    📍
                  </span>{' '}
                </h2>
                <p>Place Spotted {formatRelative(selected.time, new Date())}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
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
