import connectDb from "../../../../../models/connection/connectDb"
import Attachment from "../../../../../models/attachment"
import User from "../../../../../models/user"
import LogBook from "../../../../../models/logBook"
import handler from '../../../../../utils/handler'


export default handler([4])
	.post(async (req, res) => {
		try{
			const {lecturer, supervisorEmail, attachmentPeriod, startDate} = req.body
			const {userId} = req

			await connectDb()

			const companySupervisor = await User.findOne({email: supervisorEmail})

			if(companySupervisor){
				const attachment = await Attachment.create({
					student: userId,
					lecturer,
					supervisor: companySupervisor._id,
					attachmentPeriod,
					startDate
				})

				// generate logbook
				const logbook = await LogBook.create({
					student: userId,
					report: [{
						logs: [
							{day: 'Monday'},
							{day: 'Tuesday'},
							{day: 'Wednesday'},
							{day: 'Thursday'},
							{day: 'Friday'},
						],
						weekEnding: startDate,
					}],
				})

				if(!logbook){
					return res.status(400).json({error: 'error occurred while generating your logbook'})
				}

				return res.status(201).json({msg: 'attachment setup successful'})
			}
			return res.status(404).json({msg: 'company supervisor does not exist'})
		}
		catch (e) {
			console.log(e)
			return res.status(500).json({error: 'Something went wrong'})
		}
	})