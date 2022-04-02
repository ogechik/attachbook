import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema({
  reviewText: String,
  reviewDate: { type: Date, required: true, default: Date.now },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const CommentSchema = new mongoose.Schema({
  comment: String,
  commentDate: { type: Date, required: true, default: Date.now },
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const LogSchema = new mongoose.Schema({
  log: String,
  day: String,
  logDate: { type: Date, required: true, default: Date.now },
})

const ReportSchema = new mongoose.Schema({
  logs: [LogSchema],
  weekReport: String,
  review: ReviewSchema,
  supervisorReview: ReviewSchema,
  weekEnding: { type: Date, required: true },
})

const LogBookSchema = new mongoose.Schema({
  report: [ReportSchema],
  firstComment: CommentSchema,
  finalComment: CommentSchema,
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  registrationNo: { type: String, required: true, default: 'SCT000-0000/0000' },
})

export default mongoose.models.LogBook ||
  mongoose.model('LogBook', LogBookSchema)
