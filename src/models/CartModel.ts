import mongoose, { Schema, Document } from 'mongoose'
import { IProduct } from './ProductModel'
import { IUser } from './UserModel'

/**
 * @description Cart model
 */

type ProductItem = {
  quantity: number
  product: IProduct['_id']
}
interface ICart extends Document {
  user: IUser['_id']
  products: ProductItem[]
}

const cartSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      quantity: { type: Number, default: 1 },
      product: { type: Schema.Types.ObjectId, ref: 'product' },
    },
  ],
})

const Cart = mongoose.model<ICart>('Cart', cartSchema)

export { Cart, ICart }
