import jwt from 'jsonwebtoken'
interface Payload {
  userId: string
  isAdmin: boolean
}
const checkAuth = async (req: any) => {
  try {
    const decoded = await jwt.verify(
      req.headers.cookie.split('=')[1],
      process.env.APP_SECRET!
    )
    return decoded as Payload
  } catch (err) {
    throw new Error('Unauthorized!!!')
  }
}

export const isAuthorised = async (req: any) => {
  const { userId } = await checkAuth(req)
  return { userId }
}

export const isAdmin = async (req: any) => {
  const { userId, isAdmin } = await checkAuth(req)
  if (!isAdmin) throw new Error('Only Admin can perform this task')
  return { userId }
}
