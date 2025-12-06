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
    <div className="section">
      <h2 className="section-title">Contact</h2>
      <p className="contact-intro">
        Want to collaborate, hire, or just say hi? Feel free to reach out.
      </p>

      <div className="contact-grid">
        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="from_name" required />
          </label>
          <label>
            Email
            <input type="email" name="from_email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="4" required />
          </label>

          {status.message && (
            <p
              className={
                status.type === "success"
                  ? "contact-status contact-status-success"
                  : status.type === "error"
                  ? "contact-status contact-status-error"
                  : "contact-status"
              }
            >
              {status.message}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="contact-details">
          <p>
            <strong>Email:</strong> {basicInfo.email}
          </p>
          <p>
            <strong>Location:</strong> {basicInfo.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
