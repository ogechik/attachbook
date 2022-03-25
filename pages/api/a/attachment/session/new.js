import connectDb from "../../../../../models/connection/connectDb"
import AttachmentPeriod from "../../../../../models/attachmentPeriod"
import short from 'short-uuid'
import handler from '../../../../../utils/handler'

export default handler([0])
	.post(async (req, res) => {

		try{
			const {startDate, endDate} = req.body

			await connectDb()

			const cohort = await AttachmentPeriod.find({isArchived: false}).count() + 1
			const code = short.generate()
			const attachmentSession = await AttachmentPeriod.create({
				startingMonth: startDate,
				endingMonth: endDate,
				cohort,
				code
			})

			return res.status(200).json(attachmentSession)
		}
		catch (e){
			return res.status(500).json({error: 'Something went wrong'})
		}
	})