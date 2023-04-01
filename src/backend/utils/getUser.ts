import UserModel from "../database/models/user";
import { createWallet } from "../crypto/createWallet";

export async function getUser(telegramId: number, telegramUser?: string) {
  let userDB = await UserModel.findOne({ telegramId }).exec();

  if (!userDB) {
    console.log("User not found, creating it...");
    const walletInfo = createWallet();
    try {
      userDB = await UserModel.create({
        telegramId,
        telegramUser,
        mnemonic: walletInfo.mnemonic,
        privateKey: walletInfo.privateKey,
        address: walletInfo.address,
        tokens: [],
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return userDB;
}
