import pinPlace from '@/backend/ipfs/pinPlace'
import { getAdventifyPlace } from '@/backend/crypto/getAdventifyPlace'
import { createAdventifyPlace } from '@/backend/crypto/createAdventifyPlace'
import { createPlace } from '@/backend/database/queries/createPlace'
import { PlaceData } from '@googlemaps/google-maps-services-js'
import { findPlaceCategory } from '@/backend/database/queries/findPlaceCategory'
import { findGooglePlace } from '@/backend/google/findGooglePlace'
import { findPlace } from '@/backend/database/queries/findPlace'

export async function getOrCreatePlace(placeId: string) {
  let placeDB = await findPlace(placeId)
  if (placeDB) {
    return {
      error: false,
      data: placeDB,
    }
  }

  // Get google place details
  const placeDetails = await findGooglePlace(placeId)
  if (!placeDetails || !placeDetails.place_id || !placeDetails?.types || !placeDetails.geometry) {
    return {
      error: true,
      message: `Place not supported ${placeId}`,
    }
  }

  // Get PlaceCategory
  const placeCategories = await findPlaceCategory(placeDetails.types)
  if (!placeCategories.length) {
    return {
      error: true,
      message: `Category not supported for place ${placeId}`,
    }
  }
  const placeCategoryName = placeCategories[0].category
  const placeCategoryIPFSImageUrl = placeCategories[0].ipfsUrlImage
  // TODO: create image using AI for these cases where the category does not have an image on our DB.
  // These cases will be Provinces or Cities

  // Pin to IPFS place metadata
  const placeMetadataIPFSUrl = await pinPlace(
    placeDetails.name || 'unknown',
    { type: placeCategoryName },
    placeCategoryIPFSImageUrl
  )
  if (!placeMetadataIPFSUrl) {
    return {
      error: true,
      message: `There was an error trying to pin metadata for place ${placeId}`,
    }
  }

  // Create Place on our SC
  const placeSCCreated = await createAdventifyPlace(placeId, placeMetadataIPFSUrl, false)
  if (!placeSCCreated) {
    return {
      error: true,
      message: `There was an error minting the the place ${placeId}`,
    }
  }

  // get Place from our SC
  const placeSC = await getAdventifyPlace(placeId)
  if (!placeSC) {
    return {
      error: true,
      message: `Place ${placeId} was minted, but was not possible to access its values`,
    }
  }

  // Create place in DB
  placeDB = await createPlace({
    placeId,
    name: placeDetails.name || 'unknown',
    type: placeCategoryName,
    tokenId: placeSC.defaultTokenId.toNumber(),
    imageUrl: placeCategoryIPFSImageUrl,
    metadataUrl: placeMetadataIPFSUrl,
    location: {
      latitude: placeDetails.geometry.location.lat,
      longitude: placeDetails.geometry.location.lng,
    },
  })

  if (!placeDB) {
    console.error(`${placeId} was minted but NOT updated in the DB.`)
  }

  return {
    error: false,
    data: placeDB,
  }
}
