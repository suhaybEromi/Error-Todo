import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Detail() {
  const { todoId } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/todos/${todoId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      })
      .then(response => {
        setTodo(response.data.todo);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [todoId]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!todo) return <p className="text-center">No details available.</p>;

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <Container>
          <Row>
            <Col xl="12">
              <h2 className="mt-3 d-flex justify-content-center">
                {todo.title}
              </h2>
            </Col>
            <Col xl="12">
              <p className="mt-2 d-flex justify-content-center">
                Created By {todo.creator.name} on
                {new Date(todo.createdAt).toLocaleString()}
              </p>
              <hr className="border-2" />
            </Col>
            <Col xl="12" className="text-center">
              <img
                src={`http://localhost:4000/${todo.imageUrl}`}
                width="350"
                className="img-fluid"
              />
            </Col>
            <Col xl="12">
              <p className="mt-4 d-flex justify-content-center">
                🛑 {todo.errorDescription}
              </p>
            </Col>
            <Col xl="12">
              <p className="mt-4 d-flex justify-content-center">
                ✅ {todo.errorFix}
              </p>
            </Col>
            <Col xl="12">
              <p className="mt-4 d-flex justify-content-center">
                {todo.status}
              </p>
            </Col>
            <Col xl="12" className="mt-4">
              <h4 className="text-center fw-semibold">💻 Code</h4>
              <div
                className="p-3 rounded shadow-lg"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#d4d4d4",
                  fontFamily: "monospace",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  overflowX: "auto",
                  maxHeight: "300px",
                  whiteSpace: "pre",
                  borderRadius: "8px",
                }}
              >
                <pre className="m-0">
                  <code>{todo.code}</code>
                </pre>
              </div>
            </Col>
          </Row>
        </Container>
        <br />
      </div>
    </>
  );
}
