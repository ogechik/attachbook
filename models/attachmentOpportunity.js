import mongoose from 'mongoose'


const AttachmentOpportunitySchema = new mongoose.Schema({
	position: {type: String, required: true},
	responsibilities: {type: String, required: true},
	applyInstructions: {type:String, required: true},
	postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	datePosted: {type:Date, required: true, default: Date.now},
	isArchived: {type:Boolean, required: true, default: false},
})

export default mongoose.models.AttachmentOpportunity || mongoose.model('AttachmentOpportunity', AttachmentOpportunitySchema)