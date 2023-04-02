import UserModel from '../models/user'
import { createWallet } from '../../crypto/createWallet'

export async function getOrCreateUser(userId: string) {
  let userDB = await UserModel.findOne({ id: userId }).exec()

  if (!userDB) {
    console.log('User not found, creating it...')
    const walletInfo = createWallet()
    try {
      userDB = await UserModel.create({
        id: userId,
        mnemonic: walletInfo.mnemonic,
        privateKey: walletInfo.privateKey,
        address: walletInfo.address,
        tokens: [],
      })
      return userDB
    } catch (error) {
      console.error(error)
      return null
    }
  }

  return userDB
}
