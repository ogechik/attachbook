import connectDb from "../../../../../../models/connection/connectDb"
import AttachmentPeriod from "../../../../../../models/attachmentPeriod"
import handler from '../../../../../../utils/handler'

export default handler([0])
	.get(async (req, res) => {
		try{
			const {count} = req.query

			await connectDb()

			if(parseInt(count) === 0){
				const attachmentSessions = await AttachmentPeriod.find({isArchived: false})
				return res.status(200).json(attachmentSessions)
			}

			const attachmentSessions = await AttachmentPeriod.find({isArchived:false}).sort('-dateCreated').limit(count)
			return res.status(200).json(attachmentSessions)
		}
		catch(e){
			return res.status(500).json({error: 'Something went wrong'})
		}
	})