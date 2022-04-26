import User from '../../../models/user'
import dbConnect from '../../../models/connection/connectDb'
import handler from '../../../utils/handler'

export default handler([0, 1, 2, 3, 4]).get(async (req, res) => {
  const { userId } = req

  try {
    await dbConnect()
    const user = await User.findById(userId)

    if (user) {
      return res.status(200).json(user)
    }
    return res.status(404).json({ error: 'user not found' })
  } catch (err) {
    // console.log(err)
    return res.status(500).json({ error: 'something went wrong' })
  }
})
