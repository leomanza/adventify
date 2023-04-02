// check if place already exits

import PlaceCategory from '@/backend/database/models/placeCategory'

export async function findPlaceCategory(categories: string[]) {
  try {
    return await PlaceCategory.find({ category: { $in: [...categories] } }).exec()
  } catch (error) {
    console.error(error)
    return []
  }
}
