import connectDb from "../../../../../models/connection/connectDb"
import AttachmentPeriod from "../../../../../models/attachmentPeriod"
import handler from '../../../../../utils/handler'

export default handler([0])
	.get(async (req, res) => {
		try{
			const {id} = req.query

			await connectDb()

			const attachmentPeriod = await AttachmentPeriod.findById(id)

			if(attachmentPeriod && !attachmentPeriod.isArchived){
				return res.status(200).json(attachmentPeriod)
			}

			return res.status(404).json({error: 'Attachment Period not found'})
		}
		catch(e){
			console.log(e)
			return res.status(500).json({error: 'Something went wrong'})
		}
	})