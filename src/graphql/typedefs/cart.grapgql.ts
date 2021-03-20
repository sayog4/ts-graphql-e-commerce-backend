import { gql } from 'apollo-server-express'

const cartSchema = gql`
  type Products {
    product: Product!
    quantity: Int!
  }
  type Cart {
    id: String!
    user: User!
    products: [Products!]!
  }
  type CartItem {
    product: Product!
    quantity: Int!
  }
`

export default cartSchema
