import jwt from 'jsonwebtoken'

export const generateCookieToken = (id: string, isAdmin: boolean) => {
  return jwt.sign({ userId: id, isAdmin }, process.env.APP_SECRET!, {
    expiresIn: '1y',
  })
}
