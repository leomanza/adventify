import { getAdventify } from './getAdventify'

export async function createAdventifyPlace(
  placeId: string,
  metadataUrl: string,
  isVerified: boolean
) {
  try {
    const adventify = getAdventify()
    const txRecipient = await adventify.createPlace(placeId, metadataUrl, isVerified)
    await txRecipient.wait()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
