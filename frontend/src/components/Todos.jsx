import { useState } from "react";
import imageLaptop from "../assets/img/laptop.png";
import imageMobile from "../assets/img/mobile.png";
import { Col, Container, Row, InputGroup, Form, Modal } from "react-bootstrap";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function Todos() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([
    {
      _id: 1,
      title: "Title",
      imageUrl: "imageUrl",
      errorDescription: "Error Description",
      fixCode: "Fix Code",
      fixExplanation: "Fix Explanation",
      createdAt: "18/02/2025",
      status: "Status",
      creator: "suhayb",
    },
    {
      _id: 1,
      title: "Title",
      imageUrl: "imageUrl",
      errorDescription: "Error Description",
      fixCode: "Fix Code",
      fixExplanation: "Fix Explanation",
      createdAt: "18/02/2025",
      status: "Status",
      creator: "suhayb",
    },
  ]);

  return (
    <>
      <div className="bg-dark d-none d-md-block">
        <Navbar />
        <Container>
          <Row>
            <Col className="mt-1 mb-3 position-relative">
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
                  borderRadius: "10px",
                  textAlign: "center",
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
                <InputGroup style={{ marginTop: "360px" }}>
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

                <button
                  className="btn btn-outline-light w-50 mt-4"
                  onClick={() => setShowModal(true)}
                >
                  Add
                </button>

                <Modal
                  size="md"
                  className="mt-3 d-none d-md-block"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>New Error</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="email" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Error Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fix Code</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fix Explanation</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                      <Form.Select aria-label="Default select example">
                        <option>Has it been resolved?</option>
                        <option value="unresolved">Unresolved</option>
                        <option value="resolved">Resolved</option>
                      </Form.Select>
                    </Form>
                  </Modal.Body>
                </Modal>

                <div
                  style={{
                    marginTop: "25px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  {todos.map((todo, index) => (
                    <div key={index} style={{ minWidth: "600px" }}>
                      <div className="border p-3 flex-column">
                        <div className="d-flex justify-content-start mb-2">
                          <p>
                            Posted by {todo.creator} on {todo.createdAt}
                          </p>
                        </div>
                        <h5 className="text-start mb-3">{todo.title}</h5>

                        <div className="d-flex justify-content-end">
                          <Link
                            to="/detail"
                            className="text-decoration-none border-0 btn btn-outline-info"
                          >
                            View
                          </Link>
                          <button className="border-0 btn btn-outline-primary">
                            Update
                          </button>
                          <button className="border-0 btn btn-outline-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* NOTE Mobile👇👇👇 */}

      <div className="bg-dark d-block d-md-none">
        <Navbar />
        <Container>
          <Row>
            <Col className="mt-2 mb-3 position-relative">
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
                <InputGroup style={{ marginTop: "250px" }}>
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
                <button
                  className="btn btn-outline-light w-50 mt-4"
                  onClick={() => setShowModal(true)}
                >
                  Add
                </button>

                <Modal
                  style={{ marginTop: "45px" }}
                  className="d-block d-md-none"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>New Error</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="email" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Error Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fix Code</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fix Explanation</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                      <Form.Select className="mb-5">
                        <option>Has it been resolved?</option>
                        <option value="unresolved">Unresolved</option>
                        <option value="resolved">Resolved</option>
                      </Form.Select>
                    </Form>
                  </Modal.Body>
                </Modal>

                <div
                  style={{
                    marginTop: "25px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "19px",
                  }}
                >
                  {todos.map(todo => (
                    <div className="border">
                      <p className="p-2 d-flex justify-start">
                        Created By {todo.creator} on {todo.createdAt}
                      </p>
                      <h5 className="ms-2 text-start">{todo.title}</h5>
                      <div className="mb-2 d-flex justify-content-end">
                        <button className="border-0 btn btn-sm btn-outline-info">
                          View
                        </button>
                        <button className="border-0 btn btn-sm btn-outline-primary">
                          Update
                        </button>
                        <button className="border-0 btn btn-sm btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </div>
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
