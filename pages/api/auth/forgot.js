import jwt from 'jsonwebtoken'
import { sendMail } from '../../../utils/sendgrid/mails'
import connectDb from '../../../models/connection/connectDb'
import User from '../../../models/user'

export default async (req, res) => {
  try {
    const { email } = req.body

    await connectDb()

    const user = await User.findOne({ email: email.toLowerCase() })

    if (user) {
      const token = jwt.sign(
        {
          user: {
            _id: user._id,
          },
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        },
      )
      const html = `
      <p>Greetings ${user.firstName},</p>
      <p>We understand that you have requested to <strong>reset your password</strong>. If it was not you kindly <strong>ignore this email.</strong></strong></p>
      <p>Otherwise, if you are the one requesting to reset you password, 
        please click on the button below to reset your password.
      </p>
      <br><br>
      <a href=${process.env.DOMAIN}/forgot/reset/${token} 
      style="padding: 0.5rem 1rem; color: #fff; background-color: #212121; text-decoration: none; border-radius: 4px;">
      Reset password
      </a>
      `
      const response = await sendMail(
        user.email,
        'Reset password request.',
        html,
      )
      if (response.errors) {
        return res.status(200).json({
          error:
            'We are unable to send you an email. Contact the administrator',
        })
      }
      return res.status(200).json({ msg: 'reset mail sent' })
    }
    return res.status(404).json({ error: 'User could not be found.' })
  } catch (e) {
    console.log(e)
    return res.status(500).json('Something went wrong.')
  }
}
