import hashSalt from '../../../utils/auth/hashSalt'
import dbConnect from '../../../models/connection/connectDb'
import User from '../../../models/user'
import { capitalize } from '../../../utils/common'

export default async (req, res) => {
  const { firstName, lastName, email, role, password } = req.body
  const { method } = req

  if (method !== 'POST') {
    return res.status(400).end(`Method ${method} Not Alllowed`)
  }

  if (!email || !firstName || !lastName || !password || !role) {
    const err = new Error('Fill All required fields.')
    err.status = 400
    throw err
  }

  const { hash, salt } = await hashSalt(password)

  await dbConnect()

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() })

    if (userExists) {
      const err = new Error('User Exists.')
      err.status = 200
      throw err
    }

    const user = new User({
      email: email.toLowerCase(),
      firstName: capitalize(firstName),
      lastName: capitalize(lastName),
      role,
      hash,
      salt,
    })

    await user.save()

    return res.status(201).json({ message: 'User registered!.', user })
  } catch (err) {
    if (err.status === 500) {
      err.msg = 'Oops! Something went wrong.'
    }
    return res.status(err.status).json({ error: err.message })
  }
}
