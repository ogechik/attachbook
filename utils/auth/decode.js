import { verify } from 'jsonwebtoken'

export default function decodeUser(cookie) {
  const user = verify(
    cookie.split('auth')[1].split('=')[1],
    process.env.JWT_SECRET,
  )
  return user
}
