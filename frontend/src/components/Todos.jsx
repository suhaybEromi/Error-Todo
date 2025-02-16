import { useState } from "react";
import imageUrl from "../assets/img/gg.png";
import { Col, Container, Row } from "react-bootstrap";
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

  return (
    <>
      <Navbar />
      <div
        style={{
          background: "secondary",
          position: "relative",
          width: "1261px",
        }}
      >
        <Container>
          <Row>
            <Col>
              <img src={imageUrl} style={{ width: "100%", display: "block" }} />
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "50px",
                  color: "black",
                  fontSize: "24px",
                  fontWeight: "bold",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <div className="bg-warning" style={{ padding: "50px" }}>
                  <p>
                    {todos.map(todo => (
                      <ul key={todo._id}>
                        <li key={todo.id}>{todo.title}</li>
                        {/* <img src={imageUrl} width="100" /> */}
                        <li>{todo.errorDescription}</li>
                        <li>{todo.fixCode}</li>
                        <li>{todo.fixExplanation}</li>
                        <select>
                          <option value="pending">Pending</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </ul>
                    ))}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
