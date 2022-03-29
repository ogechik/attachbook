import connectDb from '../../../../../../models/connection/connectDb'
import AttachmentPeriod from '../../../../../../models/attachmentPeriod'
import handler from '../../../../../../utils/handler'

export default handler([0]).post(async (req, res) => {
  try {
    const { id } = req.query
    const { startMonth, endMonth } = req.body

    await connectDb()

    const attachmentPeriod = await AttachmentPeriod.findById(id)

    if (attachmentPeriod) {
      attachmentPeriod.startDate = startMonth
      attachmentPeriod.endDate = endMonth
      await attachmentPeriod.save()

      return res.status(200).json(attachmentPeriod)
    }
    return res.status(404).json({ error: 'Could not find attachment period' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
