import connectDb from "../../../../models/connection/connectDb"
import LogBook from "../../../../models/logBook"
import handler from '../../../../utils/handler'


export default handler([1])
	.post(async (req, res) => {
		try{
			const {logbookId, commentText} = req.body
			const {userId} = req

			await connectDb()

			const logbook = await LogBook.findById(logbookId)
			if(logbook) {
				logbook.comment = {comment: commentText, commentBy: userId}
				const updatedLogbook = await logbook.save()
				if(updatedLogbook){
					return res.status(200).json(updatedLogbook)
				}
				return res.status(200).json({error: 'could not comment on logbook'})
			}
			return res.status(404).json({error: 'logbook not found'})
		}catch (e) {
			console.log(e)
			return res.status(500).json({error: "Something went wrong"})
		}
	})