import connectDb from '../../../../../models/connection/connectDb'
import AttachmentPeriod from '../../../../../models/attachmentPeriod'
import Attachment from '../../../../../models/attachment'
import User from '../../../../../models/user'
import handler from '../../../../../utils/handler'

export default handler([0]).get(async (req, res) => {
  try {
    const { id } = req.query

    await connectDb()

    const attachmentPeriod = await AttachmentPeriod.findById(id).populate([
      { path: 'lecturers', model: User, select: 'firstName lastName email' },
    ])

    if (attachmentPeriod && !attachmentPeriod.isArchived) {
      const attachments = await Attachment.find({
        attachmentPeriod: id,
      }).populate([
        { path: 'lecturer', model: User, select: 'firstName lastName' },
        { path: 'student', model: User, select: 'firstName lastName' },
        { path: 'supervisor', model: User, select: 'firstName lastName' },
      ])
      return res.status(200).json({ attachmentPeriod, attachments })
    }

    return res.status(404).json({ error: 'Attachment Period not found' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
