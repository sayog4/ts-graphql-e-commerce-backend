import userTypes from './user.graphql'
import productTypes from './product.graphql'
import { gql } from 'apollo-server-express'

const base = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
export const typeDefs = [base, userTypes, productTypes]
