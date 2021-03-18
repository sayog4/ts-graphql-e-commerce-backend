import { gql } from 'apollo-server'

const userSchema = gql`
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
  }
  type Query {
    me: User
  }
  type Mutation {
    signUp(data: SignUpInput!): User
    logOut: String!
    logIn(data: LogInInput!): User
  }
`
export default userSchema
