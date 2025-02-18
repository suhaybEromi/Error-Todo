import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";
export default function Login() {
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
              <form className="mt-5 text-white border w-50 p-3">
                <label>Your E-Mail</label>
                <input
                  type="email"
                  name="email"
                  className="form-control w-100 mt-1 mb-1"
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control w-100 mt-2 mb-3"
                />
                <button className="btn btn-dark w-25">Login</button>
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
              <form className="mt-5 text-white border w-100 p-3">
                <label>Your E-Mail</label>
                <input
                  type="email"
                  name="email"
                  className="form-control w-100 mt-1 mb-2"
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control w-100 mt-1 mb-3"
                />
                <button className="btn btn-dark w-25">Login</button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
