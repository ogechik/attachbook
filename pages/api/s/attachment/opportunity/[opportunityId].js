import connectDb from "../../../../../models/connection/connectDb"
import AttachmentOpportunity from "../../../../../models/attachmentOpportunity"
import handler from "../../../../../utils/handler"


export default handler([3,4])
	.get(async (req, res) => {
		try{
			const {opportunityId} = req.query

			await connectDb()

			const opportunity = await AttachmentOpportunity.findById(opportunityId)

			if(opportunity){
				return res.status(200).json(opportunity)
			}
			return res.status(404).json({error: 'attachment opportunity not found'})
		}
		catch (e) {
			console.log(e)
			return res.status(500).json({error: 'Something went wrong'})
		}
	})