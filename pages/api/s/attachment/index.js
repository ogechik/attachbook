import connectDb from '../../../../models/connection/connectDb'
import handler from '../../../../utils/handler'
import Attachment from '../../../../models/attachment'
import AttachmentPeriod from '../../../../models/attachmentPeriod'
import User from '../../../../models/user'

export default handler([4]).get(async (req, res) => {
  try {
    const { userId } = req
    await connectDb()

    const attachment = await Attachment.findOne({ student: userId })
      .lean()
      .populate([
        { path: 'student', model: User, select: 'firstName lastName email' },
        { path: 'lecturer', model: User, select: 'firstName lastName email' },
        {
          path: 'supervisor',
          model: User,
          select: 'firstName lastName email',
        },
        {
          path: 'attachmentPeriod',
          model: AttachmentPeriod,
          select: 'cohort',
        },
      ])

    if (attachment) {
      return res.status(200).json(attachment)
    }
    return res.status(404).json({ error: 'attachment not found' })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'something went wrong' })
  }
})
