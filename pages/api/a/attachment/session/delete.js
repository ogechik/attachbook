import connectDb from "../../../../../models/connection/connectDb"
import AttachmentPeriod from "../../../../../models/attachmentPeriod"
import handler from '../../../../../utils/handler'

export default handler([0])
	.post(async (req, res)=>{
		try{
			const {attachmentSessionId} = req.body

			await connectDb()

			const attachmentPeriod = await AttachmentPeriod.findById(attachmentSessionId)

			if(attachmentPeriod && !attachmentPeriod.isArchived){
				attachmentPeriod.isActive = false
				attachmentPeriod.isArchived = true
				await attachmentPeriod.save()

				return res.status(200).json(attachmentPeriod)
			}
			return res.status(404).json({error: 'Attachment period does not exist'})
		}
		catch(e){
			return res.status(500).json({error: 'Something went wrong'})
		}
	})