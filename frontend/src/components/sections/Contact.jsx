import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profileData } from "../../data/profileData.js";

function Contact() {
  const { basicInfo, socialLinks } = profileData;
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "error",
        message:
          "Email service is not configured yet. Please contact me directly at " +
          basicInfo.email
      });
      return;
    }

    setSending(true);

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setStatus({
          type: "success",
          message: "Thanks! Your message has been sent successfully."
        });
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus({
          type: "error",
          message:
            "Something went wrong while sending the message. Please try again or email me directly at " +
            basicInfo.email
        });
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <section className="section container">
      <h2 className="section-title">Contact</h2>
      <p className="hero-description" style={{ marginBottom: '2rem' }}>
        Want to collaborate, hire, or just say hi? Feel free to reach out.
      </p>

      <div className="contact-container">
        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" name="from_name" required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" name="from_email" required className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea name="message" rows="4" required className="form-textarea" />
          </div>

          {status.message && (
            <p
              style={{
                color: status.type === 'success' ? '#22c55e' : '#ef4444',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}
            >
              {status.message}
            </p>
          )}

          <button type="submit" className="btn btn-primary" disabled={sending} style={{ width: '100%' }}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="contact-details" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Email</h3>
            <p className="text-muted">{basicInfo.email}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Location</h3>
            <p className="text-muted">{basicInfo.location}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Socials</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {socialLinks.map(link => (
                <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontSize: '0.95rem' }}>
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
