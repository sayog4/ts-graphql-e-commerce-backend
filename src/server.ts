import * as dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { connectDB } from './db/connectDb'
import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/typedefs'
import Models from './models'

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
  context: ({ req, res }) => {
    return {
      Models,
      req,
      res,
    }
  },
})
const app = express()
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb' }))
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
)
app.use(cookieParser())

server.applyMiddleware({ app, cors: false })

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`)
)
