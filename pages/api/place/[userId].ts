import { generateImage } from '@/backend/ai/image'
import { dbConnect } from '@/backend/database/dbConnect'
import PlaceCategory from '@/backend/database/models/placeCategory'
import { getPlacesByUser } from '@/backend/database/queries/getMarkersByUser'
import pinImage from '@/backend/ipfs/pinImage'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const places = await getPlacesByUser('nf.dominguez.87@gmail.com')

  return res.status(200).json(places)
}
