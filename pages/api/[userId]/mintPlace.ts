import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const place = req.body.place // place from googleMaps
  

  const user = await supabase.getUserBy(userId) 

  if (!user) {
    return res.status(403)
  }

  if(!user.getAddress()) {
    const walletData = createWallet()
    user.save(walletData)
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
