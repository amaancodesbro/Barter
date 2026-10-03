import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("CREATING ACCOUNT...");

    try {
      const response = await fetch(
        `${API_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
body: JSON.stringify({
  name,
  email,
  password,
  phone,
  whatsapp,
}),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "REGISTRATION FAILED.");
        return;
      }

      setMessage("ACCOUNT CREATED SUCCESSFULLY.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("SERVER CONNECTION FAILED.");
    }
  };

  return (
    <section className="register-page">
        <button
  className="page-back-button"
  onClick={() => navigate("/")}
>
  ← BACK TO HOME
</button>
      <div className="register-card">
        <p>[ NEW MEMBER ]</p>

        <h1>CREATE ACCOUNT</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="YOUR NAME"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <input
  type="tel"
  placeholder="PHONE NUMBER (OPTIONAL)"
  value={phone}
  onChange={(event) => setPhone(event.target.value)}
/>

<input
  type="tel"
  placeholder="WHATSAPP NUMBER (OPTIONAL)"
  value={whatsapp}
  onChange={(event) => setWhatsapp(event.target.value)}
/>

          <button type="submit">
            CREATE ACCOUNT →
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </section>
  );
}

export default Register;