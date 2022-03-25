import connectDb from "../../../../models/connection/connectDb"
import AttachmentOpportunity from "../../../../models/attachmentOpportunity"
import handler from "../../../../utils/handler"


export default handler([3])
 .post(async (req,res)=> {
	 try{
		 const {attachmentOpportunityId} = req.body

		 await connectDb()

		 const attachmentOpportunity = await AttachmentOpportunity.findById(attachmentOpportunityId)

		 if(attachmentOpportunity){
			 attachmentOpportunity.isArchived = true
			 const updatedAttachmentOpportunity = await attachmentOpportunity.save()
			 if(updatedAttachmentOpportunity){
				 return res.status(200).json(updatedAttachmentOpportunity)
			 }
			 return res.status(200).json({error: 'could not update attachment opportunity'})
		 }
		 return res.status(404).json({error: 'attachment opportunity not found'})
	 }catch (e) {
		 return res.status(500).json({error: 'Something went wrong'})
	 }
 })