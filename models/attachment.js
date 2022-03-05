import mongoose from 'mongoose'


const AttachmentSchema = new mongoose.Schema({
	admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	lecture: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	supervisor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	attachmentPeriod: {type: mongoose.Schema.Types.ObjectId, ref: 'AttachmentPeriod', required: true},
	isComplete: {type:Boolean, required: true, default: true},
})

export default mongoose.models.Attachment || mongoose.model('Attachment', AttachmentSchema)