import UserModel from '../models/user'
import Place from '../models/place'

export async function getPlacesByUser(userId: string) {
  try {
    const userDB = await UserModel.findOne({ id: userId }).exec()
    const places = Place.find({ tokenId: { $in: userDB?.tokens } }).exec()
    return places
  } catch (error) {
    console.error(error)
    return null
  }
}
