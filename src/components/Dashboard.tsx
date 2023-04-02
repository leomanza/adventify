import { useLoadScript } from '@react-google-maps/api'
import { useMemo } from 'react'

import Map from './Map'

export default function Dashboard() {
  const libraries = useMemo(() => ['places'], [])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY_MAP as string,
    libraries: libraries as any,
  })

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  if (loadError) return <p>"Error</p>

  return <Map />
}
