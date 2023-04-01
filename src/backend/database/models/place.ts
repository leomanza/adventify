import { models, model, Schema, Model } from 'mongoose'

interface IPlace {
  id: string
  type: string
  tokenId: number
  name: string
  // location?: { latitude: number; longitude: number }
  // compoundCode?: {
  //   code: string
  //   name: string
  // }
  imageUrl: string
  metadataUrl: string
}

const PlaceSchema: Schema = new Schema<IPlace>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  tokenId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  // location: new Schema<{ latitude: Number; longitude: Number }>(
  //   {
  //     latitude: { type: Number, required: true },
  //     longitude: { type: Number, required: true },
  //   },
  //   { _id: false }
  // ),
  // compoundCode: new Schema<{ code: String; name: String }>(
  //   {
  //     code: { type: String, required: true },
  //     name: { type: String, required: true },
  //   },
  //   { _id: false }
  // ),
  imageUrl: {
    type: String,
    required: true,
  },
  metadataUrl: {
    type: String,
    required: true,
  },
})

const PlaceModel = (models.Location as Model<IPlace>) || model<IPlace>('Place', PlaceSchema)

export default PlaceModel
