import connectDb from "../../../../../models/connection/connectDb"
import AttachmentPeriod from "../../../../../models/attachmentPeriod"
import handler from '../../../../../utils/handler'

export default handler([4]).get(async (req, res)=>{
	try{
		const {code} = req.query

		await connectDb()

		const attachmentSession = await AttachmentPeriod.findOne({code})
		if(attachmentSession){
			return res.status(200).json(attachmentSession)
		}
		return res.status(404).json({error: 'attachment session not found'})
	}catch(e){
		return res.status(500).json({error: 'Something went wrong.'})
	}
})