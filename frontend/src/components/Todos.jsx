import { useState } from "react";
import imageLaptop from "../assets/img/laptop.png";
import imageMobile from "../assets/img/mobile.png";
import { Col, Container, Row, Card, InputGroup, Form } from "react-bootstrap";
import Navbar from "./Navbar";

export default function Todos() {
  const [todos, setTodos] = useState([
    {
      _id: 1,
      title: "Title",
      imageUrl: "imageUrl",
      errorDescription: "Error Description",
      fixCode: "Fix Code",
      fixExplanation: "Fix Explanation",
      status: "Status",
      creator: "Creator",
    },
  ]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <>
      {error && <div>Error</div>}
      <div className="d-none d-md-block">
        <Navbar />
        <Container>
          <Row>
            <Col className="mt-3 mb-3 position-relative">
              <img
                src={imageLaptop}
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: "10px",
                }}
                alt="Title"
              />
              <div
                style={{
                  marginTop: "20px",
                  position: "absolute",
                  top: "12%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  padding: "20px",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "400px",
                }}
              >
                <style>
                  {`
              ::placeholder {
                color: white !important;
                opacity: 1;
                  }
              `}
                </style>
                <InputGroup style={{ marginTop: "80px" }}>
                  <Form.Control
                    style={{
                      backgroundColor: "transparent",
                      color: "white",
                    }}
                    placeholder="Name"
                  />
                  <button className="btn btn-sm btn-outline-light">
                    Update
                  </button>
                </InputGroup>
                <button className="btn btn-outline-light w-50 mt-4">Add</button>
                <div style={{ marginTop: "60px" }}>
                  {todos.map(todo => (
                    <ul className="list-unstyled text-white">
                      <li>{todo.title}</li>
                      <li>{todo.imageUrl}</li>
                    </ul>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* NOTE Mobile👇👇👇 */}

      <div className="d-block d-md-none">
        <Navbar />
        <Container>
          <Row>
            <Col className="mt-3 mb-3 position-relative">
              <img
                src={imageMobile}
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: "10px",
                }}
                alt="Title"
              />
              <div
                style={{
                  marginTop: "20px",
                  position: "absolute",
                  top: "12%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "88%",
                  maxWidth: "400px",
                }}
              >
                <InputGroup style={{ marginTop: "80px" }}>
                  <Form.Control
                    style={{
                      width: "100px",
                      backgroundColor: "transparent",
                      color: "white",
                      border: "1px solid white",
                      height: "32px",
                      fontSize: "15px",
                    }}
                    placeholder="Name"
                  />
                  <button className="btn btn-sm btn-outline-light">
                    Update
                  </button>
                </InputGroup>
                <button className="btn btn-sm btn-outline-light w-50 mt-4">
                  Add
                </button>
                <div style={{ marginTop: "60px" }}>
                  {todos.map(todo => (
                    <ul className="list-unstyled text-white">
                      <li>{todo.title}</li>
                      <li>{todo.imageUrl}</li>
                    </ul>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
