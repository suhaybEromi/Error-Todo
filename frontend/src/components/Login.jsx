import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const [addLogin, setAddLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const handleChange = e => {
    setAddLogin({ ...addLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        addLogin,
      );
      login(response.data.token);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <div className="d-none d-lg-block">
        <style>
          {`
          body {
            background: black !important;
          }
        `}
        </style>
        <Navbar />
        <Container>
          <Row>
            <Col className="d-flex justify-content-center">
              <form
                onSubmit={handleSubmit}
                className="mt-5 text-white border w-50 p-3"
              >
                <label>Your E-Mail</label>
                <input
                  type="email"
                  name="email"
                  value={addLogin.email}
                  onChange={handleChange}
                  className="form-control w-100 mt-1 mb-1"
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={addLogin.password}
                  onChange={handleChange}
                  className="form-control w-100 mt-2 mb-3"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                  type="submit"
                  className="btn btn-dark w-25"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* NOTE Mobile Design */}

      <div className="d-block d-lg-none">
        <style>
          {`
          body {
            background: black !important;
          }
        `}
        </style>
        <Navbar />
        <Container>
          <Row>
            <Col>
              <form
                onSubmit={handleSubmit}
                className="mt-5 text-white border w-100 p-3"
              >
                <label>Your E-Mail</label>
                <input
                  type="email"
                  name="email"
                  value={addLogin.email}
                  onChange={handleChange}
                  className="form-control w-100 mt-1 mb-2"
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={addLogin.password}
                  onChange={handleChange}
                  className="form-control w-100 mt-1 mb-3"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                  type="submit"
                  className="btn btn-dark w-25"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
