import connectDb from '../../../../models/connection/connectDb'
import User from '../../../../models/user'
import handler from '../../../../utils/handler'

export default handler([0, 1, 2, 3, 4]).post(async (req, res) => {
  try {
    const { firstName } = req.body
    const { userId } = req

    await connectDb()

    const user = await User.findById(userId)

    if (user) {
      user.firstName = firstName
      const updatedUser = await user.save()
      return res.status(200).json(updatedUser)
    }
    return res.status(404).json({ error: 'user not found' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
