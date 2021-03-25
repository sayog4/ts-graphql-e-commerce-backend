import { gql } from 'apollo-server-express'

const cartSchema = gql`
  type CartItem {
    product: Product!
    quantity: Int!
  }
  type Cart {
    id: String
    products: [CartItem]
  }
  input AddToCartInput {
    productId: String!
    quantity: Int!
  }
  extend type Query {
    myCart: Cart!
  }
  extend type Mutation {
    addToCart(data: AddToCartInput!): Boolean
    removeFromCart(productId: String!): String!
  }
`

export default cartSchema
