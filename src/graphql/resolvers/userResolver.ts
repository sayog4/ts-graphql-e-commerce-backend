import bcrypt from 'bcryptjs'

import { Resolvers } from '../../generated/graphql'
import { Cart } from '../../models/CartModel'
import { User } from '../../models/UserModel'
import { generateCookieToken } from '../../utils/createToken'
import { isAdmin } from '../../utils/checkAuth'
/**
 * @description User Resolver
 */
const userResolver: Resolvers = {
  Query: {
    me: async (_, args, context) => {
      const { userId } = await isAdmin(context.req)
      console.log(userId)
      return {
        name: 'sayog',
        email: 'sayog@gmail.com',
        phone: '48464564',
      }
    },
  },
  Mutation: {
    /**
     * @description signUp
     */
    signUp: async (_, args, context) => {
      const {
        data: { email, name, password, phone },
      } = args
      /**
       * @check if email already exist
       */
      const userExist = await User.findOne({ email })

      if (userExist)
        throw new Error('Email already exist!! Please Login to continue!!')

      const user = await User.create({
        name,
        email,
        password,
        phone,
      })

      const token = generateCookieToken(user._id, user.isAdmin)

      context.res.cookie('gql-shop', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, //1 year
        secure: true,
      })

      await new Cart({ user: user._id }).save()

      return user
    },
    logOut: (_, args, context) => {
      console.log(context.res)

      context.res.clearCookie('gql-shop')
      return 'Success!!'
    },
    logIn: async (_, args, context) => {
      const {
        data: { email, password },
      } = args

      const user = await User.findOne({ email })
      if (!user) throw new Error('Email not found!!!')

      const matchPw = await bcrypt.compare(password, user.password)
      if (!matchPw) throw new Error('Password is invalid!!!!')

      const token = generateCookieToken(user._id, user.isAdmin)

      context.res.cookie('gql-shop', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365, //1 year
        secure: true,
      })
      return user
    },
  },
}
export default userResolver
