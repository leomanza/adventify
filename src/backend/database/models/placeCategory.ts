import { models, model, Schema, Model } from 'mongoose'

interface IPlaceCategory {
  category: string
  ipfsUrlImage: string
}

const PlaceCategorySchema: Schema = new Schema<IPlaceCategory>({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  ipfsUrlImage: {
    type: String,
    required: true,
  },
})

const PlaceCategoryModel =
  (models.PlaceCategory as Model<IPlaceCategory>) ||
  model<IPlaceCategory>('PlaceCategory', PlaceCategorySchema)

export default PlaceCategoryModel
