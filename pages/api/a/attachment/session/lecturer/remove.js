import AttachmentPeriod from '../../../../../../models/attachmentPeriod'
import User from '../../../../../../models/user'
import connectDb from '../../../../../../models/connection/connectDb'

export default async (req, res) => {
  try {
    const { sessionId, lecturerId } = req.body

    await connectDb()

    const session = await AttachmentPeriod.findById(sessionId)
    if (session) {
      const lecturer = session.lecturers.find(
        (id) => id.toString() === lecturerId.toString(),
      )
      if (lecturer) {
        session.lecturers.pull(lecturer)
        const updatedSession = await session.save()
        const populatedSession = await AttachmentPeriod.populate(
          updatedSession,
          [{ path: 'lecturers', model: User, select: 'firstName lastName' }],
        )
        if (populatedSession) {
          return res.status(200).json(populatedSession)
        }
        return res.status(200).json({ error: 'error updating the session' })
      }
      return res.status(404).json({ error: 'lecturer not found' })
    }
    return res.status(404).json({ error: 'session not found' })
  } catch (e) {
    // console.log(e)
    return res.status(500).json({ error: 'something went wrong' })
  }
}
