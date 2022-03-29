import connectDb from '../../../../models/connection/connectDb'
import Logbook from '../../../../models/logBook'
import handler from '../../../../utils/handler'

export default handler([4]).get(async (req, res) => {
  try {
    const { userId } = req

    await connectDb()

    const logbook = await Logbook.findOne({ student: userId })
      .lean()
      .populate([
        { path: 'student', model: 'User', select: 'firstName lastName' },
      ])

    if (logbook) {
      return res.status(200).json(logbook)
    }
    return res.status(404).json({ error: 'logbook not found' })
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong.' })
  }
})
