import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";

export default function Signup() {
  const [addSignup, setAddSignup] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const { user } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setAddSignup({ ...addSignup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (addSignup.password !== addSignup.confirmPassword) {
      toast.error("❌ Passwords must match!", {
        position: "top-center",
        autoClose: 3000,
      });
      setLoading(false);
      setAddSignup(prev => ({ ...prev, password: "", confirmPassword: "" }));
      return;
    }

    try {
      await axios.post("http://localhost:4000/auth/signup", addSignup);
      setAddSignup({ email: "", password: "", name: "", confirmPassword: "" });
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      setError(err.message || "An error occurred");
      toast.error("An error occurred", {
        position: "top-center",
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/signup");
    }
  }, [user]);

  return (
    <>
      <ToastContainer />
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
              {loading && <p className="text-white">Loading...</p>}
              <form
                onSubmit={handleSubmit}
                className="mt-5 text-white border w-50 p-3"
              >
                {error && <div className="alert alert-danger">{error}</div>}
                <label>Your E-Mail</label>
                <input
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={addSignup.email}
                  className="form-control w-100 mt-1 mb-3"
                />
                <label>Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={addSignup.password}
                  className="form-control w-100 mt-2 mb-3"
                />
                <label>Your Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={addSignup.name}
                  className="form-control w-100 mt-2 mb-3"
                />
                <label>ConfirmPassword</label>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={addSignup.confirmPassword}
                  className="form-control w-100 mt-2 mb-3"
                />
                <button
                  type="submit"
                  className="btn btn-dark w-25"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Signup"}
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
                  required
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={addSignup.email}
                  className="form-control w-100 mt-1 mb-3"
                />
                <label>Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={addSignup.password}
                  className="form-control w-100 mt-1 mb-3"
                />
                <label>Your Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={addSignup.name}
                  className="form-control w-100 mt-1 mb-3"
                />
                <label>ConfirmPassword</label>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={addSignup.confirmPassword}
                  className="form-control w-100 mt-1 mb-3"
                />
                <button
                  type="submit"
                  className="btn btn-dark w-25"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Signup"}
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
