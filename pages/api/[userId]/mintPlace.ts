import type { NextApiRequest, NextApiResponse } from 'next'
import { getUser } from '../../../src/backend/utils/getUser'

type Data = {
  name?: string
  message?: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const userId = req.query.userId
  // place from googleMaps
  const place = req.body.place 

  if(!userId || Array.isArray(userId)) {
    return res.status(500)
  }
  
  const user = await getUser(userId as string) 

  if (!user) {
    return res.status(500).json({ message: 'User not found' })
  }
 

  const category = place.category // bus_station

  const ipfsHash = getCategory(category)

  await adventify.getPlace(place.id)
if(!place) {
    
    const ipfsHash = getCategory(category)
}


  await mintPlace(user.wallet)

  

  if(!user.wallet) {
    // create wallet
  }

  


  


  res.status(200).json({ name:  })
}
