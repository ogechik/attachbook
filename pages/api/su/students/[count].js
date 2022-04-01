import connectDb from '../../../../models/connection/connectDb'
import Attachment from '../../../../models/attachment'
import User from '../../../../models/user'
import handler from '../../../../utils/handler'

export default handler([2]).get(async (req, res) => {
  try {
    const { count } = req.query
    const { userId } = req

    await connectDb()

    if (parseInt(count, 10) === 0) {
      const attachments = await Attachment.find({
        supervisor: userId,
        isComplete: false,
      }).populate([
        { path: 'student', model: User, select: 'firstName lastName' },
        { path: 'lecturer', model: User, select: 'firstName lastName' },
      ])
      return res.status(200).json(attachments)
    }

    const attachments = await Attachment.find({
      supervisor: userId,
      isComplete: false,
    })
      .sort('-dateCreated')
      .limit(count)
    return res.status(200).json(attachments)
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
