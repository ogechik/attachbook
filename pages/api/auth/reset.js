import dbConnect from '../../../models/connection/connectDb'
import User from '../../../models/user'
import hashSalt from '../../../utils/auth/hashSalt'

export default async (req, res) => {
  const { method } = req
  const { password, userId } = req.body

  if (method !== 'POST') {
    return res.status(400).end(`Method ${method} Not Alllowed`)
  }

  try {
    await dbConnect()
    const user = await User.findById(userId)
    if (user) {
      const { hash, salt } = await hashSalt(password)
      user.hash = hash
      user.salt = salt
      await user.save()

      return res.status(200).json({ message: 'ok' })
    }
    return res.status(404).json({ error: 'User not found' })
  } catch (e) {
    // console.log(e)
    return res.status(500).json({ error: e.message })
  }
}
