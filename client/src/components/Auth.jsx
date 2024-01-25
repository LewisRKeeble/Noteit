import { useState } from "react";
import { useCookies } from "react-cookie";

export default function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [hasLogIn, setHasLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  function viewLogin(status) {
    setError(null);
    setHasLogIn(status);
  }

  async function handleSubmit(e, endpoint) {
    e.preventDefault();
    if (!hasLogIn && password !== confirmPassword) {
      setError("Invalid input");
      return;
    }
    const result = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await result.json();
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      window.location.reload();
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-container-secondary">
        <form className="form">
          <h1>{hasLogIn ? "Log in!" : "Sign Up "}</h1>
          <input
            required
            type="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          {!hasLogIn && (
            <input
              required
              type="password"
              placeholder="Confirm Password..."
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, hasLogIn ? "login" : "signup")}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button onClick={() => viewLogin(false)} className="auth-button">
            Sign up
          </button>
          <button onClick={() => viewLogin(true)} className="auth-button">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
