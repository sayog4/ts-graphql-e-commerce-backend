import mongoose, { Schema, Document } from 'mongoose'

/**
 * @description Product model
 */
interface IProduct extends Document {
  name: string
  brand: string
  description: string
  image: string
  price: number
  countInStock: number
}

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Product = mongoose.model<IProduct>('Product', productSchema)

export { Product, IProduct }
