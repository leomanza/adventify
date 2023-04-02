import { constants } from 'ethers'
import { getAdventify } from './getAdventify'

export async function getAdventifyPlace(placeId: string) {
  try {
    const adventify = getAdventify()
    const place = await adventify.places(placeId)
    if (place.defaultTokenId == constants.Zero) {
      return null
    }
    return place
  } catch (error) {
    console.error(error)
    return null
  }
}
