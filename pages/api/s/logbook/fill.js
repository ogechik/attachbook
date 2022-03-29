import connectDb from '../../../../models/connection/connectDb'
import LogBook from '../../../../models/logBook'
import handler from '../../../../utils/handler'

export default handler([4]).post(async (req, res) => {
  try {
    const { logbookId, reportId, logId, logText } = req.body

    await connectDb()

    const logbook = await LogBook.findById(logbookId)

    if (logbook) {
      const report = await logbook.report.id(reportId)
      const log = await report.logs.id(logId)
      log.log = logText
      log.logDate = new Date()
      const updatedLogbook = await logbook.save()

      const updatedPopulated = await LogBook.populate(updatedLogbook, [
        { path: 'student', model: 'User', select: 'firstName lastName' },
      ])

      if (updatedPopulated) {
        return res.status(200).json(updatedPopulated)
      }
      return res.status(200).json({ error: 'Could not update logbook' })
    }
    return res.status(404).json({ error: 'logbook not found' })
  } catch (e) {
    // console.log(e)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
