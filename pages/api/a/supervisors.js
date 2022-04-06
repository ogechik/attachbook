import connectDb from '../../../models/connection/connectDb'
import User from '../../../models/user'
import handler from '../../../utils/handler'

export default handler([0]).get(async (req, res) => {
  try {
    await connectDb()

    const supervisors = await User.find({
      isActive: true,
      role: 2,
    })
    if (supervisors) {
      return res.status(200).json(supervisors)
    }
    return res.status(404).json({ error: 'supervisors not found' })
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
