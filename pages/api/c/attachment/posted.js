import connectDb from '../../../../models/connection/connectDb'
import AttachmentOpportunity from '../../../../models/attachmentOpportunity'
import handler from '../../../../utils/handler'
import User from '../../../../models/user'

export default handler([3]).get(async (req, res) => {
  try {
    const { userId } = req

    await connectDb()

    const posted = await AttachmentOpportunity.find({
      postedBy: userId,
      isArchived: false,
    }).populate([
      { path: 'postedBy', model: User, select: 'firstName lastName' },
    ])

    if (posted.length > 0) {
      return res.status(200).json(posted)
    }
    return res
      .status(404)
      .json({ error: 'no attachment opportunities posted yet' })
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
