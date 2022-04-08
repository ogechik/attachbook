import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function sendMail(to, subject, html) {
  const msg = {
    to,
    from: { email: process.env.SENDGRID_MAIL, name: 'Attachbook' },
    subject,
    html,
  }

  try {
    return await sgMail.send(msg)
  } catch (error) {
    console.error(error)
    if (error.response) {
      return error.response.body
    }
    return error
  }
}
