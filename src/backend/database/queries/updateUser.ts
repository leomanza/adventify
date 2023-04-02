import UserModel, { IUser } from '../models/user'

export async function updateUser(telegramId: number, user: IUser) {
  try {
    let userDB = await UserModel.findOneAndUpdate<IUser>({ telegramId }, user).exec()

    return userDB
  } catch (error) {
    console.error(error)
    return null
  }
}
