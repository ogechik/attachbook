import connectDb from '../../../../models/connection/connectDb'
import LogBook from '../../../../models/logBook'
import handler from '../../../../utils/handler'
import User from '../../../../models/user'

export default handler([2]).post(async (req, res) => {
  try {
    const { logbookId, reportId, reviewText } = req.body
    const { userId } = req

    await connectDb()

    const logbook = await LogBook.findById(logbookId)
    const report = await logbook.report.id(reportId)
    if (report) {
      report.supervisorReview = { reviewText, reviewer: userId }
      const updatedLogbook = await logbook.save()
      const populatedLogbook = await LogBook.populate(updatedLogbook, [
        { path: 'student', model: User, select: 'firstName lastName' },
      ])
      if (populatedLogbook) {
        return res.status(200).json(populatedLogbook)
      }
      return res.status(200).json({ error: 'could not find report on logbook' })
    }
    return res.status(404).json({ error: 'logbook not found' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
