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
  imageUrl: {
    type: String,
    required: true,
  },
  metadataUrl: {
    type: String,
    required: true,
  },
})

const PlaceModel = (models.Place as Model<IPlace>) || model<IPlace>('Place', PlaceSchema)

export default PlaceModel
