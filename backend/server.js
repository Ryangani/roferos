import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'

const envPath = fileURLToPath(new URL('./.env', import.meta.url))
dotenv.config({ path: envPath })

const app = express()
const port = process.env.PORT || 5000
const emailUser = process.env.EMAIL_USER
const emailPass = process.env.EMAIL_PASS
const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
})

if (emailUser && emailPass) {
  transporter.verify((error) => {
    if (error) {
      console.error('Email transporter verify failed:', error)
    } else {
      console.log('Email transporter is ready')
    }
  })
} else {
  console.log('Email transporter is not configured; missing EMAIL_USER or EMAIL_PASS.')
}

app.use(cors())
app.use(express.json())

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'Please complete all fields.' })
  }

  if (!emailUser || !emailPass) {
    return res.status(500).json({ success: false, error: 'Email sender is not configured.' })
  }

  const mailOptions = {
    from: `${emailUser}`,
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
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
