import axios from 'axios'
// import { PlacesAPIResponse } from "../../types/google/PlaceResponse";
import { Client } from '@googlemaps/google-maps-services-js'

export async function findGooglePlace(placeId: string) {
  const client = new Client({})

  try {
    // https://developers.google.com/maps/documentation/places/web-service/details?hl=en
    const res = await client.placeDetails({
      params: {
        place_id: placeId,
        fields: [
          'address_components',
          'business_status',
          'formatted_address',
          'name',
          'place_id',
          'type',
        ],
        key: process.env.GOOGLE_MAPS_KEY_DB as string,
      },
    })

    console.log(res.data.result.types)
    return res.status == 200 ? res.data.result : null
  } catch (error) {
    console.error(error)
    return null
  }
}

//export type NearBySearchRes = Awaited<ReturnType<typeof findGooglePlace>>
