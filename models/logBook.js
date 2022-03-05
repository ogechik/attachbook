import mongoose from 'mongoose'


const ReviewSchema = new mongoose.Schema({
	review: String,
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

const ReportSchema = new mongoose.Schema({
	day: String,
	week: Number,
	log: String,
	logDate: { type: Date, required: true, default: Date.now },
	comment: CommentSchema,
})

const LogBookSchema = new mongoose.Schema({
	report: [ReportSchema],
	review: ReviewSchema,
	student: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})

export default mongoose.models.LogBook || mongoose.model('LogBook', LogBookSchema)