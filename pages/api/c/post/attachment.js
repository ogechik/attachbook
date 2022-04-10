import connectDb from '../../../../models/connection/connectDb'
import AttachmentOpportunity from '../../../../models/attachmentOpportunity'
import handler from '../../../../utils/handler'

export default handler([3]).post(async (req, res) => {
  try {
    const { position, applyInstructions, responsibilities } = req.body
    const { userId } = req

    await connectDb()

    const attachmentOpportunity = await AttachmentOpportunity.create({
      position,
      applyInstructions,
      responsibilities,
      postedBy: userId,
    })

    if (attachmentOpportunity) {
      return res.status(201).json(attachmentOpportunity)
    }
    return res.status(200).json({ error: 'Could not post attachment' })
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
