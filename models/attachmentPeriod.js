import mongoose from 'mongoose'


const AttachmentPeriodSchema = new mongoose.Schema({
	cohort: {type: String, required: true},
	code: {type: String, required: true, unique: true},
	startingMonth: {type:Date, required: true},
	endingMonth: {type:Date, required: true},
	lecturers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	isActive: {type:Boolean, required: true, default: true},
	dateCreated: {type: Date, required: true, default: Date.now},
	isArchived: {type: Boolean, required: true, default: false},
})

export default mongoose.models.AttachmentPeriod || mongoose.model('AttachmentPeriod', AttachmentPeriodSchema)