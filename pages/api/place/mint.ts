import type { NextApiRequest, NextApiResponse } from 'next'
import { getOrCreateUser } from '@/backend/database/queries/getOrCreateUser'
import { mintAdventifyPlace } from '@/backend/crypto/mintAdventifyPlace'
import { getOrCreatePlace } from '@/backend/utils/getOrCreatePlace'
import { dbConnect } from '@/backend/database/dbConnect'

type Data = {
  error: boolean
  message?: string
  data?: {
    tokenId: number
    metadataUrl: string
    imageUrl: string
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await dbConnect()

  // TODO: we need to do a real login system and pass the real userId instead of the mail
  const userId = req.body.userId
  const placeId = req.body.placeId

  // check params
  if (!userId || !placeId) {
    return res.status(500).json({ error: true, message: 'Invalid params' })
  }

  // get or create User
  const userDB = await getOrCreateUser(userId as string)
  if (!userDB) {
    return res.status(500).json({ error: true, message: 'User not found' })
  }

  // get or create the Place
  const placeRes = await getOrCreatePlace(placeId)
  if (placeRes?.error || !placeRes?.data) {
    return res.status(500).json({ error: true, message: placeRes.message })
  }

  // mint token
  await mintAdventifyPlace(userDB.address, placeRes.data.tokenId)
  // update user tokens
  userDB.tokens.push(placeRes.data.tokenId)
  await userDB.save()

  res.status(200).json({
    error: false,
    data: {
      tokenId: placeRes.data.tokenId,
      metadataUrl: placeRes.data.metadataUrl,
      imageUrl: placeRes.data.imageUrl,
    },
  })
}
