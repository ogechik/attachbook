import connectDb from '../../../../../models/connection/connectDb'
import AttachmentOpportunity from '../../../../../models/attachmentOpportunity'
import handler from '../../../../../utils/handler'

export default handler([3]).post(async (req, res) => {
  try {
    const { position, responsibilities, applyInstructions } = req.body
    const { opportunityId } = req.query

    await connectDb()

    const attachmentOpportunity = await AttachmentOpportunity.findById(
      opportunityId,
    )
    if (attachmentOpportunity) {
      attachmentOpportunity.position = position
      attachmentOpportunity.responsibilities = responsibilities
      attachmentOpportunity.applyInstructions = applyInstructions
      const updatedAttachmentOpportunity = await attachmentOpportunity.save()
      if (updatedAttachmentOpportunity) {
        return res.status(200).json(updatedAttachmentOpportunity)
      }
      return res
        .status(200)
        .json({ error: 'could not update attachment opportunity' })
    }
    return res.status(404).json({ error: 'attachment opportunity not found' })
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
