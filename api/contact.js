import nodemailer from 'nodemailer'

const emailUser = process.env.EMAIL_USER
const emailPass = process.env.EMAIL_PASS
const emailTo = process.env.EMAIL_TO || emailUser

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'Please complete all fields.' })
  }

  if (!emailUser || !emailPass) {
    return res.status(500).json({ success: false, error: 'Email sender is not configured.' })
  }

  const mailOptions = {
    from: emailUser,
    to: emailTo,
    subject,
    replyTo: email,
    text: `Message from ${name} <${email}>:\n\n${message}`,
    html: `
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return res.status(200).json({ success: true, message: 'Message sent successfully.' })
  } catch (error) {
    console.error('Email send failed:', error)
    return res.status(500).json({ success: false, error: 'Unable to send message. Please try again later.' })
  }
}
