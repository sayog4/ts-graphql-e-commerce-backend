import { gql } from 'apollo-server-express'

const userTypes = gql`
  scalar Date
  input SignUpInput {
    name: String!
    email: String!
    password: String!
    phone: String!
  }
  input LogInInput {
    email: String!
    password: String!
  }
  type User {
    id: ID
    name: String
    email: String
    phone: String
    cart: [CartItem]
    # cart: Cart
  }
  extend type Query {
    me: User
  }
  extend type Mutation {
    signUp(data: SignUpInput!): User
    logOut: String!
    logIn(data: LogInInput!): User
  }
`
export default userTypes
