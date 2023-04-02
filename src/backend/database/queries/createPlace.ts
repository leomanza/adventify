import PlaceModel from '@/backend/database/models/place'

type Params = {
  placeId: string
  name: string
  type: string
  tokenId: number
  imageUrl: string
  metadataUrl: string
}
export async function createPlace(params: Params) {
  try {
    const place = await PlaceModel.create({
      id: params.placeId,
      type: params.type,
      tokenId: params.tokenId,
      name: params.name,
      imageUrl: params.imageUrl,
      metadataUrl: params.metadataUrl,
    })

    return place
  } catch (error) {
    console.error(error)
    return null
  }
}
