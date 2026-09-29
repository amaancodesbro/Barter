import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("LOGGING IN...");

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "LOGIN FAILED.");
        return;
      }

      localStorage.setItem("token", data.token);

      onLogin(data.token);

      setMessage("LOGIN SUCCESSFUL.");
    } catch (error) {
      setMessage("SERVER CONNECTION FAILED.");
    }
  };

  return (
    <section className="login-page">
        <div className="market-ticker ticker-top">
  <div className="ticker-track">
    ● BARTER MARKET LIVE &nbsp;&nbsp; TRADE WHAT YOU HAVE • FIND WHAT YOU WANT &nbsp;&nbsp; NO MONEY. JUST VALUE. &nbsp;&nbsp;
    ● BARTER MARKET LIVE &nbsp;&nbsp; TRADE WHAT YOU HAVE • FIND WHAT YOU WANT &nbsp;&nbsp; NO MONEY. JUST VALUE. &nbsp;&nbsp;
  </div>
</div>

    <div className="login-hud hud-left">
      REAL<br />
      ITEMS<br />
      REAL<br />
      PEOPLE<br />
      REAL<br />
      TRADES<br />
      —
    </div>

    <div className="login-hud hud-right">
      BARTER<br />
      A FAIRER<br />
      WORLD<br />
      —
    </div>

    <div className="login-status">
      TRADE...<br />
      SWITCH...<br />
      LIVE...<br />
      —
    </div>
      <div className="login-card">
        <p className="login-kicker">[ MEMBER ACCESS ]</p>

        <h1>LOGIN</h1>

        <p className="login-description">
          ENTER THE MARKETPLACE.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="EMAIL"
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
            ENTER MARKETPLACE →
          </button>
        </form>

        {message && (
          <p className="login-message">
            {message}
          </p>
        )}
        <p className="login-register">
  DON'T HAVE AN ACCOUNT?{" "}
  <a href="/register">[ REGISTER ]</a>
</p>
      </div>
      <div className="market-ticker ticker-bottom">
  <div className="ticker-track">
    ● BARTER MARKET LIVE &nbsp;&nbsp; REAL PEOPLE • REAL ITEMS • REAL TRADES &nbsp;&nbsp; VALUE ISN'T ALWAYS MEASURED IN MONEY &nbsp;&nbsp;
    ● BARTER MARKET LIVE &nbsp;&nbsp; REAL PEOPLE • REAL ITEMS • REAL TRADES &nbsp;&nbsp; VALUE ISN'T ALWAYS MEASURED IN MONEY &nbsp;&nbsp;
  </div>
</div>
    </section>
  );
}

export default Login;
