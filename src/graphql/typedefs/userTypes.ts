import { gql } from 'apollo-server'

export default gql`
  scalar Date
  type User {
    id: ID
    name: String
    email: String
    phone: String
  }
  type Query {
    me: User
  }
`
