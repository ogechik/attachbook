import connectDb from '../../../../models/connection/connectDb'
import AttachmentOpportunity from '../../../../models/attachmentOpportunity'
import handler from '../../../../utils/handler'
import User from '../../../../models/user'

export default handler([4]).get(async (req, res) => {
  try {
    await connectDb()

    const opportunities = await AttachmentOpportunity.find({
      isArchived: false,
    })
      .sort('-datePosted')
      .populate([
        { path: 'postedBy', model: User, select: 'firstName lastName' },
      ])

    if (opportunities.length > 0) {
      return res.status(200).json(opportunities)
    }
    return res.status(404).json({ error: 'attachment opportunities not found' })
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
