import connectDb from '../../../../models/connection/connectDb'
import LogBook from '../../../../models/logBook'
import User from '../../../../models/user'
import handler from '../../../../utils/handler'

export default handler([1]).post(async (req, res) => {
  try {
    const { logbookId, firstComment } = req.body
    const { userId } = req

    await connectDb()

    const logbook = await LogBook.findById(logbookId)
    if (logbook) {
      logbook.firstComment = { comment: firstComment, commentBy: userId }
      const updatedLogbook = await logbook.save()
      const populatedLogbook = await LogBook.populate(updatedLogbook, [
        { path: 'student', model: User, select: 'firstName lastName' },
      ])
      if (populatedLogbook) {
        return res.status(200).json(populatedLogbook)
      }
      return res.status(200).json({ error: 'could not comment on logbook' })
    }
    return res.status(404).json({ error: 'logbook not found' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
