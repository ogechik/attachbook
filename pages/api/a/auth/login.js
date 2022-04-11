import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import User from '../../../../models/user'
import dbConnect from '../../../../models/connection/connectDb'

export default async (req, res) => {
  const { email, password } = req.body
  const { method } = req

  if (method !== 'POST') {
    return res.status(400).json({ message: `Method ${method} Not Allowed` })
  }

  if (!email || !password) {
    return res.status(400).json({ message: `Fill all required fields` })
  }

  try {
    await dbConnect()
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return res.status(404).json({ error: 'User does not exist' })
    }

    if (!user.isSuperUser) {
      return res.status(401).json({ error: 'Unauthorized!' })
    }

    const validPassword = await user.validatePassword(password)

    if (!validPassword) {
      return res.status(401).json({ error: 'Wrong email password combination' })
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    )

    if (token) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('auth_admin', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: 86400,
          path: '/',
        }),
      )
      return res
        .status(200)
        .json({ message: 'successful login', role: user.role })
    }
  } catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}
