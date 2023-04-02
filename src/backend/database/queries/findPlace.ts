// check if place already exits

import PlaceModel from '@/backend/database/models/place'

export async function findPlace(placeId: string) {
  try {
    const location = await PlaceModel.findOne({ id: placeId }).exec()
    return location || null
  } catch (error) {
    console.error(`Error trying to find place ${placeId}`)
    console.error(error)
    return null
  }
}
