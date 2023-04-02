import { generateImage } from '@/backend/ai/image'
import { dbConnect } from '@/backend/database/dbConnect'
import PlaceCategory from '@/backend/database/models/placeCategory'
import pinImage from '@/backend/ipfs/pinImage'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // return res.status(500).json({ status: 'stopped for now =(' })

  await dbConnect()

  const categoryName = req.query.name

  const generatedImage = await generateImage(
    `3D render of a collectible image of a floating realistic ${categoryName} inside the collectible in a background clear sky, anime art`
  )

  if (!generatedImage) {
    return res.status(500)
  }

  const pinned = await pinImage(generatedImage)

  await PlaceCategory.create({
    category: categoryName,
    ipfsUrlImage: pinned,
  })

  return res.status(200).json({ status: 'ok' })
}
