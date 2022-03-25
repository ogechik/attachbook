import { verify } from 'jsonwebtoken'
import nextConnect from 'next-connect'
import isAuthorized from './auth/protect'

export default function handler(allowed) {
	return nextConnect({
		onError(error, req, res) {
			res.status(501).json({ error: 'something went wrong' })
		},
		onNoMatch(req, res) {
			res.status(405).json({ error: `Method ${req.method} not allowed` })
		},
	}).use((req, res, next) => {
		req.userId = null
		req.username = null
		req.role = null
		const { auth } = req.cookies

		if (!auth) {
			return res.status(401).json({ error: 'authorization token missing' })
		}

		verify(auth, process.env.JWT_SECRET, (error, decoded) => {
			if (!error && decoded) {
				req.userId = decoded.id
				req.username = decoded.firstName
				req.role = decoded.role
			}

			if (!isAuthorized(req, allowed)) {
				return res.status(401).json({ error: 'not authorized' })
			}

			return next()
		})
	})
}