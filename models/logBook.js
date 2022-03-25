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
	weekEnding: { type: Date, required: true}
})


const LogBookSchema = new mongoose.Schema({
	report: [ReportSchema],
	comment: CommentSchema,
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: true,
	},
})

export default mongoose.models.LogBook || mongoose.model('LogBook', LogBookSchema)