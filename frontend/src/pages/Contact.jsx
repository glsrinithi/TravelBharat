import { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    try {
      const response = await fetch(
        "http://localhost:5000/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully! 🎉");

        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        setStatus(data.message || "Something went wrong.");
      }

    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("Unable to connect to the server.");
    }
  };

  return (
    <>
      <Navbar />

      <section className="contact-page">

        <div className="contact-intro">
          <h1>Contact Us</h1>

          <p>
            Have a question, suggestion or feedback?
            We'd love to hear from you.
          </p>
        </div>

        <div className="contact-container">

          <div className="contact-info">

            <h2>Get in Touch</h2>

            <p>
              Whether you want to know more about a destination
              or have suggestions for TravelBharat, feel free
              to reach out to us.
            </p>

            <div className="contact-item">
              <h3>📍 Location</h3>
              <p>India</p>
            </div>

            <div className="contact-item">
              <h3>✉️ Email</h3>
              <p>support@travelbharat.com</p>
            </div>

            <div className="contact-item">
              <h3>🌐 Explore India</h3>
              <p>Discover. Explore. Experience.</p>
            </div>

          </div>


          <div className="contact-form-box">

            <h2>Send us a Message</h2>

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>Message</label>

                <textarea
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>


              <button type="submit">
                Send Message
              </button>

            </form>

            {status && (
              <p className="contact-status">
                {status}
              </p>
            )}

          </div>

        </div>

      </section>
    </>
  );
}

export default Contact;