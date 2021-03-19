import { Resolvers } from '../../generated/graphql'
import { Product } from '../../models/ProductModel'
import { isAdmin } from '../../utils/checkAuth'
import { uploadImage } from '../../utils/cloudinaryUpload'

/**
 * @description Product Resolver
 */

const ProductResolver: Resolvers = {
  Query: {
    allProducts: async (_, args) => {
      return Product.find({}).sort({ createdAt: -1 })
    },
    singleProduct: async (_, args) => {
      const product = await Product.findById({ _id: args.id })
      if (!product) throw new Error('Product Not Found!!')

      return product
    },
  },

  Mutation: {
    uploadImage: async (_, args, context) => {
      // check for admin
      const { userId } = await isAdmin(context.req)

      const img = await uploadImage(args.image)

      return img.secure_url
    },
    createProduct: async (_, args, context) => {
      const { userId } = await isAdmin(context.req)

      const { name, brand, description, countInStock, price, image } = args.data
      const product = await Product.create({
        name,
        brand,
        description,
        countInStock,
        price,
        image,
      })

      return product
    },

    updateProduct: async (_, args, context) => {
      const { userId } = await isAdmin(context.req)

      const {
        id,
        name,
        brand,
        image,
        price,
        countInStock,
        description,
      } = args.data
      try {
        const product = await Product.findByIdAndUpdate(
          id,
          {
            name,
            brand,
            image,
            price,
            countInStock,
            description,
          },
          { new: true }
        )
        if (!product) throw new Error('product not found')
        return product
      } catch (error) {
        throw new Error(error.message)
      }
    },

    deleteProduct: async (_, args, context) => {
      const { userId } = await isAdmin(context.req)
      const product = Product.findByIdAndRemove(args.id)
      if (!product) throw new Error('No such Product')
      return product
    },
  },
}

export default ProductResolver
