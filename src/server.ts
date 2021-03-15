import * as dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from 'apollo-server'

import { connectDB } from './db/connectDb'
import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/typedefs'

/**
 * @description database connection
 */

connectDB()

/**
 * @description Initialize apollo server
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(process.env.PORT).then(({ url }) => {
  server.graphqlPath = 'graphql'
  console.log(`SERVER IS RUNNING ON --- ${url}${server.graphqlPath}`)
})
