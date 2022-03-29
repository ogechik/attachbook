import connectDb from '../../../../../models/connection/connectDb'
import LogBook from '../../../../../models/logBook'
import handler from '../../../../../utils/handler'

export default handler([4]).post(async (req, res) => {
  try {
    await connectDb()

    const { logbookId } = req.body

    const logbook = await LogBook.findById(logbookId)

    if (logbook) {
      if (logbook.report.length < 12) {
        const previousWeekEnding = new Date(
          logbook.report[logbook.report.length - 1].weekEnding,
        )
        const weekEnding = previousWeekEnding.setDate(
          previousWeekEnding.getDate() + 7,
        )
        const report = {
          logs: [
            { day: 'Monday' },
            { day: 'Tuesday' },
            { day: 'Wednesday' },
            { day: 'Thursday' },
            { day: 'Friday' },
          ],
          weekEnding,
        }
        logbook.report = logbook.report.concat(report)
        const updatedLogbook = await logbook.save()
        const updatedPopulated = await LogBook.populate(updatedLogbook, [
          { path: 'student', model: 'User', select: 'firstName lastName' },
        ])
        if (updatedPopulated) {
          return res.status(200).json(updatedPopulated)
        }
      }
      return res.status(200).json({ error: 'Maximum weeks reached' })
    }
    return res.status(404).json({ error: 'logbook could not be found' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
