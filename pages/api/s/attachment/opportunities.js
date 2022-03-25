import connectDb from "../../../../models/connection/connectDb"
import AttachmentOpportunity from "../../../../models/attachmentOpportunity"
import handler from "../../../../utils/handler"


export default handler([3])
 .get(async (req, res)=>{
	 try{
		 await connectDb()

		 const opportunities = await AttachmentOpportunity.find({isArchived: false}).sort('-datePosted')

		 if(opportunities.length > 0){
			 return res.status(200).json(opportunities)
		 }
		 return res.status(404).json({error: 'attachment opportunities not found'})
	 }
	 catch (e) {
		 return res.status(500).json({error: 'Something went wrong'})
	 }
 })
