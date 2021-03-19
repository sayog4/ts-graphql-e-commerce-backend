import { gql } from 'apollo-server-express'

const productSchema = gql`
  type Product {
    id: String
    brand: String!
    name: String!
    description: String!
    image: String!
    countInStock: Int!
    price: Int!
  }
  input CreateProductInput {
    brand: String!
    name: String!
    description: String!
    image: String!
    countInStock: Int!
    price: Int!
  }
  input UpdateProductInput {
    id: String!
    brand: String!
    name: String!
    description: String!
    image: String!
    countInStock: Int!
    price: Int!
  }
  extend type Query {
    allProducts: [Product!]!
    singleProduct(id: String!): Product!
  }
  extend type Mutation {
    uploadImage(image: String!): String!
    createProduct(data: CreateProductInput!): Product
    updateProduct(data: UpdateProductInput!): Product
    deleteProduct(id: String!): Product
  }
`

export default productSchema
