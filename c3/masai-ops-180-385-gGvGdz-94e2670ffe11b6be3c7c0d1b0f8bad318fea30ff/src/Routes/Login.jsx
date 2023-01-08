import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authState, loginUser } = useContext(AuthContext);
  const [loginsubmit,setLoginsubmit]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginsubmit(true);
    try {
      let res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      res = await res.json();
      loginUser(res.token);
    } catch (error) {
      console.log(`Error found:`, error);
    }
  };
  if (authState.isAuth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="login-page">
      <form data-testid="login-form" onSubmit={handleSubmit} className="form">
        <div>
          <label>
            {" "}
            Email
            <input
              style={{
                marginLeft: "25px",
                marginBottom: "10px",
                height: "25px",
                alignItems: "center",
                marginTop: "20px"
              }}
              data-testid="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Password
            <input
              style={{
                marginLeft: "5px",
                marginBottom: "10px",
                height: "25px",
                alignItems: "center"
              }}
              data-testid="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
          </label>
        </div>
        <div>
          <input
           disabled={loginsubmit}
            style={{
              backgroundColor: "cyan",
              borderRadius: "5px",
              marginTop: "10px",
              marginBottom: "15px",
              border: "1px solid blue",
              height: "28px",
              width: "80px",
              cursor: "pointer"
            }}
            data-testid="form-submit"
            type="submit"
            value="SUBMIT"
          />
        </div>
      </form>
      <div>
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          Go Back
        </Link>
      </div>
    </div>
  );
}
export default Login;