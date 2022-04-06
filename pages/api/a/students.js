import connectDb from '../../../models/connection/connectDb'
import User from '../../../models/user'
import handler from '../../../utils/handler'

export default handler([0]).get(async (req, res) => {
  try {
    await connectDb()

    const students = await User.find({
      isActive: true,
      role: 4,
    })
    if (students) {
      return res.status(200).json(students)
    }
    return res.status(404).json({ error: 'students not found' })
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
