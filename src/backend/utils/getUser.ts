import UserModel from '../database/models/user'
import { createWallet } from '../crypto/createWallet'

export async function getUser(userId: string) {
  let userDB = await UserModel.findOne({ userId }).exec()

  if (!userDB) {
    console.log('User not found, creating it...')
    const walletInfo = createWallet()
    try {
      userDB = await UserModel.create({
        userId,
        mnemonic: walletInfo.mnemonic,
        privateKey: walletInfo.privateKey,
        address: walletInfo.address,
        tokens: [],
      })
    } catch (error) {
      console.error(error)
      return null
    }
  }

  return userDB
}
