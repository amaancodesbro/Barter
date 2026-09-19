import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    setMessage("CREATING ACCOUNT...");

    try {
      const response = await fetch(
        "http://localhost:3000/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
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