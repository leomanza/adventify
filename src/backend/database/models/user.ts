import { models, Model, model, Schema } from 'mongoose'

export interface IUser {
  id: number
  privateKey: string
  mnemonic: string
  address: string
  tokens: number[]
}

const UserSchema = new Schema<IUser>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  privateKey: {
    type: String,
    required: true,
    unique: true,
  },
  mnemonic: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: [Number],
})

const UserModel = (models.User as Model<IUser>) || model<IUser, Model<IUser>>('User', UserSchema)

export default UserModel
