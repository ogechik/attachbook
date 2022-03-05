import mongoose from 'mongoose'
import hashSalt from '../utils/auth/hashSalt'


const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	role: { type: Number, required: true }, // 0 admin, 1 vendor, 2 client
	phoneNo: String,
	hash: String,
	salt: String,
	isApproved: { type: Boolean, required: true, default: false },
	isSuperUser: { type: Boolean, required: true, default: false },
	isActive: { type: Boolean, required: true, default: false },
	companyName: String,
})

UserSchema.methods.validatePassword = async function (password) {
	const { hash } = await hashSalt(password, this.salt)
	return this.hash === hash
}

export default mongoose.models.User || mongoose.model('User', UserSchema)