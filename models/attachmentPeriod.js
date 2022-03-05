import mongoose from 'mongoose'


const AttachmentPeriodSchema = new mongoose.Schema({
	cohort: {type: String, required: true},
	startingMonth: {type:String, required: true},
	endingMonth: {type:String, required: true},
	isActive: {type:Boolean, required: true, default: true},
})

export default mongoose.models.AttachmentPeriod || mongoose.model('AttachmentPeriod', AttachmentPeriodSchema)