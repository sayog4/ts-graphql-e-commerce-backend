import { Cart as CartType, CartItem, Resolvers } from '../../generated/graphql'
import { Cart } from '../../models/CartModel'
import { isAuthorised } from '../../utils/checkAuth'

const cartResolver: Resolvers = {
  Query: {
    myCart: async (_, args, context) => {
      //  check auth
      const { userId } = await isAuthorised(context.req)

      const cart = await Cart.findOne({ user: userId }).populate({
        path: 'products.product',
        model: 'Product',
      })
      if (!cart) throw new Error('Cart not found!!')

      return cart as CartType
    },
  },
  Mutation: {
    addToCart: async (_, args, context) => {
      const { userId } = await isAuthorised(context.req)
      const { productId, quantity } = args.data

      const cart = await Cart.findOne({ user: userId })
      if (!cart) throw new Error('Cart not found')
      // check if product already exists
      const exists = cart.products.some(
        (p) => productId === p.product.toString()
      )

      if (exists) {
        await Cart.findOneAndUpdate(
          { _id: cart._id, 'products.product': productId },
          { $inc: { 'products.$.quantity': quantity } }
        )
      } else {
        const newObj = { quantity, product: productId }

        await Cart.findOneAndUpdate(
          { _id: cart._id },
          { $push: { products: newObj } },
          { new: true }
        )
      }

      return true
    },
    removeFromCart: async (_, args, context) => {
      const { userId } = await isAuthorised(context.req)
      const cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $pull: { products: { product: args.productId } } },
        { new: true }
      ).populate({
        path: 'products.product',
        model: 'Product',
      })
      if (!cart) throw new Error('Error')

      return args.productId
      // return cart
    },
  },
}

export default cartResolver
