import short from 'short-uuid'
import connectDb from '../../../../../models/connection/connectDb'
import AttachmentPeriod from '../../../../../models/attachmentPeriod'
import handler from '../../../../../utils/handler'

export default handler([0]).post(async (req, res) => {
  try {
    const { startDate, endDate, lecturers } = req.body

    await connectDb()

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const cohort = `${months[new Date(startDate).getMonth()]}-${
      months[new Date(endDate).getMonth()]
    }/${new Date(startDate).getFullYear()}`

    const code = short.generate()
    const attachmentSession = await AttachmentPeriod.create({
      startingMonth: startDate,
      endingMonth: endDate,
      cohort,
      code,
      lecturers,
    })

    return res.status(201).json(attachmentSession)
  } catch (e) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
