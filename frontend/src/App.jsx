import { useMemo, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

const skills = [
  'Technical Sales',
  'Customer Support',
  'Hardware Knowledge',
  'Troubleshooting',
  'PC Assembly',
  'System Installation',
  'Product Compatibility',
  'Communication Skills',
  'React.js',
  'Node.js',
  'MS Office',
  'Shopify',
  'E-commerce Platforms',
]

const experience = [
  {
    title: 'Technical Sales & Customer Support Intern',
    company: 'MAKOTEK Computer Sales Inc.',
    period: '540-hour OJT',
    details: [
      'Explained computer hardware, software, and compatibility to customers.',
      'Matched product recommendations to customer needs and budgets.',
      'Supported after-sales inquiries and basic troubleshooting requests.',
    ],
  },
  {
    title: 'IT Graduate',
    company: 'Misamis Oriental Institute of Science and Technology Inc.',
    period: 'Graduated 2026',
    details: [
      'Applied technical learning to practical hardware and software workflows.',
      'Completed projects with a focus on usability and real-world support.',
      'Built strong documentation and communication skills for client-facing roles.',
    ],
  },
]

const certificates = [
  {
    title: 'Certificate of Completion',
    subtitle: 'On-the-Job Training at MAKOTEK Computer Sales Inc. – 540 hours',
    details: [
      'Technical sales, customer support, PC assembly, system installation, and troubleshooting.',
    ],
  },
  {
    title: 'Certificate of Completion',
    subtitle: 'Windows Server 2012 Training (ltfreetraining) – 9 hours and 24 minutes',
    details: ['Foundational Windows Server administration and management skills.'],
  },
  {
    title: 'Certificate of Completion',
    subtitle: 'Active Directory by ltfreetraining – 14 hours and 51 minutes',
    details: ['User, group, and permissions management in Active Directory environments.'],
  },
  {
    title: 'Certificate of Completion',
    subtitle: 'Introduction to the Fundamentals of Databases',
    details: ['Core database concepts including structure, queries, and data organization.'],
  },
  {
    title: 'Certificate of Completion',
    subtitle: 'Databases with SQL by CS50',
    details: ['Database design, querying, and SQL fundamentals from CS50 course material.'],
  },
  {
    title: 'Certificate of Completion',
    subtitle: 'MongoDB Database Training – 11 hours',
    details: ['NoSQL database knowledge and MongoDB query and schema basics.'],
  },
  {
    title: 'Certificate of Completion',
    subtitle: 'PHP for Web Development by CodeMy – 2 hours and 33 minutes',
    details: ['Foundational PHP skills for server-side scripting and web development.'],
  },
  {
    title: 'Certificate of Completion',
    subtitle: 'JavaScript Programming by Bro Code – 8 hours',
    details: ['JavaScript fundamentals for building interactive web experiences.'],
  },
  {
    title: 'Certificate of Completion',
    subtitle: 'HTML and CSS by Telugu – 9 hours and 7 minutes',
    details: ['Web page structure and styling best practices for modern layouts.'],
  },
  {
    title: 'Certificate of Recognition',
    subtitle: 'Participating in School Voting Management System of College Students Elections',
    details: ['Recognized for contributions to academic voting system development and support.'],
  },
]

function App() {
  const form = useRef(null)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const skillsMarkup = useMemo(
    () =>
      skills.map((skill) => (
        <span key={skill} className="skill-pill">
          {skill}
        </span>
      )),
    [],
  )

  const experienceMarkup = useMemo(
    () =>
      experience.map((item) => (
        <article key={item.title} className="experience-card">
          <h3>{item.title}</h3>
          <p className="experience-meta">
            {item.company} · {item.period}
          </p>
          <ul>
            {item.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </article>
      )),
    [],
  )

  const sendEmail = async (event) => {
    event.preventDefault()
    setSending(true)
    setStatus('')

    const formData = new FormData(form.current)
    const data = {
      from_name: formData.get('user_name'),
      from_email: formData.get('user_email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        data,
        publicKey
      )

      if (result.status === 200) {
        setStatus('Message sent successfully!')
        event.target.reset()
      } else {
        setStatus('Failed to send message')
      }
    } catch (error) {
      console.error('Send failed:', error)
      setStatus('Unable to send message. Please try again later.')
    }

    setSending(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">RYAN ROFEROS Portfolio</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#certificates">Certificates & Awards</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero-panel" id="home">
          <div className="hero-copy">
            <p className="eyebrow">IT Graduate • Technical Sales • Customer Support</p>
            <h1>Motivated professional with hands-on technical sales and customer support experience.</h1>
            <p>
              I combine product expertise and customer-focused communication to help clients
              find the right hardware and software solutions. My work is grounded in clarity,
              practical recommendations, and reliable after-sales support.
            </p>
            <div className="hero-actions">
              <a href="#about" className="button">
                About Me
              </a>
              <a href="#contact" className="button">
                Contact Me
              </a>
            </div>
          </div>

          <aside className="hero-card">
            <div className="profile-photo-wrap">
              <img src="/ainasad.png" alt="Profile photo" className="profile-photo" />
            </div>
            <div className="hero-card-inner">
              <p className="section-label">Developer of this website.</p>
              <h2>Ryan John H. Roferos</h2>
              <p className="hero-subtext">My Personal Details.</p>
              <ul className="hero-highlights">
                <li>Date of Birth: September 14, 2003</li>
                <li>From Cagayan de Oro City, Misamis Oriental, Philippines</li>
                <li>Graduate of Bachelor of Science in Information Technology</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="section-panel" id="about">
          <div className="section-head">
            <span>About Me</span>
            <h2>Technical sales and customer support with a strong IT foundation.</h2>
          </div>
          <div className="section-grid about-grid">
            <div>
              <p className="summary-text">
                “Motivated IT graduate with hands-on technical sales and customer support experience at MAKOTEK Computer Sales Inc. (540-hour OJT). Skilled in explaining computer hardware, software, and compatibility to customers. Combines tech knowledge with a customer-oriented mindset to help clients find the right solutions. Experienced in troubleshooting, PC assembly, system installation, and after-sales support. Also capable of handling retail operations and customer service tasks with strong communication and problem-solving skills. Ready to apply product expertise, technical knowledge, and customer service abilities in a sales-tech or retail environment role.”
              </p>
              <ul className="about-list">
                <li>Technical sales and client-facing product guidance</li>
                <li>Customer support with troubleshooting and follow-up</li>
                <li>PC assembly, system installation, and compatibility testing</li>
              </ul>
            </div>
            <div className="about-card">
              <p className="section-label">Key strengths</p>
              <div className="about-tags">
                <span>Technical Sales</span>
                <span>Customer Service</span>
                <span>Hardware Expertise</span>
                <span>Troubleshooting</span>
                <span>PC Assembly</span>
                <span>System Installation</span>
                <span>Communication</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-panel" id="skills">
          <div className="section-head">
            <span>Skills</span>
            <h2>Tools and abilities I use to support customers and deliver solutions.</h2>
          </div>
          <div className="skills-grid">{skillsMarkup}</div>
        </section>

        <section className="section-panel" id="experience">
          <div className="section-head">
            <span>Relevant Experience</span>
            <h2>Practical roles and real-world learning.</h2>
          </div>
          <div className="experience-grid">{experienceMarkup}</div>
        </section>

        <section className="section-panel" id="certificates">
          <div className="section-head">
            <span>Certificates & Awards</span>
            <h2>Training achievements and recognition to support your career path.</h2>
          </div>
          <div className="projects-grid">
            {certificates.map((certificate) => (
              <article key={certificate.subtitle} className="project-card">
                <h3>{certificate.title}</h3>
                <p className="certificate-subtitle">{certificate.subtitle}</p>
                <ul>
                  {certificate.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section-panel" id="contact">
          <div className="section-head">
            <span>Contact</span>
            <h2>Connect for technical sales, support, or IT assistant roles.</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-copy">
              <p>
                I am ready to apply product expertise and communication skills to a role that blends technical support with client-facing service.
              </p>
              <div className="contact-details">
                <a className="contact-detail contact-phone" href="tel:09560944675">
                  Phone: 09560944675
                </a>
                <a
                  className="contact-detail contact-facebook"
                  href="https://www.facebook.com/ryanganiiii2k3?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook Profile
                </a>
                <a className="contact-detail contact-email" href="mailto:ryanroferos2@gmail.com">
                  ryanroferos2@gmail.com
                </a>
              </div>
            </div>
            <form ref={form} className="contact-form" onSubmit={sendEmail}>
              <label>
                Name
                <input type="text" name="user_name" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" name="user_email" placeholder="you@example.com" required />
              </label>
              <label>
                Subject
                <input type="text" name="subject" placeholder="Subject" required />
              </label>
              <label>
                Message
                <textarea name="message" placeholder="Tell me about your opportunity" rows="5" required />
              </label>
              <button type="submit" className="button" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
              {status && <p className="status-message">{status}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer-bar">
        <p>© 2026 All Rights Reserved | Built with React and Node.js | Designed and developed by an IT graduate passionate about clean and functional web solutions.</p>
      </footer>
    </div>
  )
}

export default App
