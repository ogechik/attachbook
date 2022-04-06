import connectDb from '../../../../../../models/connection/connectDb'
import AttachmentPeriod from '../../../../../../models/attachmentPeriod'
import User from '../../../../../../models/user'
import handler from '../../../../../../utils/handler'

export default handler([0]).get(async (req, res) => {
  try {
    const { count } = req.query

    await connectDb()

    if (parseInt(count, 10) === 0) {
      const attachmentSessions = await AttachmentPeriod.find({
        isArchived: false,
      }).populate([{ path: 'lecturers', model: User }])
      return res.status(200).json(attachmentSessions)
    }

    const attachmentSessions = await AttachmentPeriod.find({
      isArchived: false,
    })
      .sort('-dateCreated')
      .limit(count)
    return res.status(200).json(attachmentSessions)
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
