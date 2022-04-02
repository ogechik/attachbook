import connectDb from '../../../../models/connection/connectDb'
import Attachment from '../../../../models/attachment'
import User from '../../../../models/user'
import handler from '../../../../utils/handler'

export default handler([1, 2]).get(async (req, res) => {
  try {
    const { count } = req.query
    const { userId, role } = req

    await connectDb()

    if (parseInt(count, 10) === 0) {
      if (role === 1) {
        const attachments = await Attachment.find({
          lecturer: userId,
          isComplete: false,
        }).populate([
          { path: 'student', model: User, select: 'firstName lastName' },
          { path: 'supervisor', model: User, select: 'firstName lastName' },
        ])
        return res.status(200).json(attachments)
      }

      const attachments = await Attachment.find({
        supervisor: userId,
        isComplete: false,
      }).populate([
        { path: 'student', model: User, select: 'firstName lastName' },
        { path: 'lecturer', model: User, select: 'firstName lastName' },
      ])
      return res.status(200).json(attachments)
    }
    if (role === 1) {
      const attachments = await Attachment.find({
        lecturer: userId,
        isComplete: false,
      })
        .sort('-dateCreated')
        .limit(count)
        .populate([
          { path: 'student', model: User, select: 'firstName lastName' },
          { path: 'supervisor', model: User, select: 'firstName lastName' },
        ])
      return res.status(200).json(attachments)
    }
    const attachments = await Attachment.find({
      supervisor: userId,
      isComplete: false,
    })
      .sort('-dateCreated')
      .limit(count)
      .populate([
        { path: 'student', model: User, select: 'firstName lastName' },
        { path: 'lecturer', model: User, select: 'firstName lastName' },
      ])
    return res.status(200).json(attachments)
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
