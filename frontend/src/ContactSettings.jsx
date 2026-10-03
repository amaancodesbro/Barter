import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ContactSettings({ token }) {
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/users/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load contact details");
        }
        return response.json();
      })
      .then((data) => {
        setPhone(data.phone || "");
        setWhatsapp(data.whatsapp || "");
      })
      .catch(() => {
        setMessage("Could not load contact details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/users/contact`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone, whatsapp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update contact details");
      }

      setMessage("Contact details saved successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  if (loading) {
    return <div className="app">Loading contact details...</div>;
  }
return (
  <div className="app">
    <Link to="/" className="page-back-button">
      ← BACK TO HOME
    </Link>

    <section className="contact-settings">
      <h1>EDIT CONTACT DETAILS</h1>

      <p>
        Add your phone and WhatsApp numbers so accepted swap partners
        can contact you.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Include country code, e.g. +91..."
        />

        <label htmlFor="whatsapp">WhatsApp Number</label>
        <input
          id="whatsapp"
          type="tel"
          value={whatsapp}
          onChange={(event) => setWhatsapp(event.target.value)}
          placeholder="Include country code, e.g. +91..."
        />

        <button type="submit">SAVE CONTACT DETAILS</button>
      </form>

      {message && <p role="status">{message}</p>}
    </section>
  </div>
);
}

export default ContactSettings;