import connectDb from "../../../../../models/connection/connectDb"
import LogBook from "../../../../../models/logBook"
import handler from '../../../../../utils/handler'


export default handler([2])
	.get(async (req, res) => {
		try{
			const {studentId} = req.query

			await connectDb()

			const logbook = await LogBook.findOne({student: studentId})

			if(logbook){
				return res.status(200).json(logbook)
			}
			return res.status(404).json({error: "logbook not found"})
		}
		catch (e) {
			console.log(e)
			return res.status(500).json({error: "Something went wrong"})
		}
	})