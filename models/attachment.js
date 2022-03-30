import mongoose from 'mongoose'

const AttachmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attachmentPeriod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AttachmentPeriod',
    required: true,
  },
  startDate: { type: Date, required: true },
  dateCreated: { type: Date, required: true, default: Date.now },
  isComplete: { type: Boolean, required: true, default: false },
})

export default mongoose.models.Attachment ||
  mongoose.model('Attachment', AttachmentSchema)
