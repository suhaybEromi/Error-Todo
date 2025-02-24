import { useEffect, useState } from "react";
import imageLaptop from "../assets/img/laptop.png";
import imageMobile from "../assets/img/mobile.png";
import { Col, Container, Row, InputGroup, Form, Modal } from "react-bootstrap";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function Todos() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState({
    title: "",
    imageUrl: "",
    errorDescription: "",
    errorFix: "",
    code: "",
    status: "",
  });
  const [cookies] = useCookies(["token"]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleChange = e => {
    setAddTodo({ ...addTodo, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setAddTodo({ ...addTodo, image: e.target.files[0] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", addTodo.title);
    formData.append("image", addTodo.image);
    formData.append("errorDescription", addTodo.errorDescription);
    formData.append("errorFix", addTodo.errorFix);
    formData.append("code", addTodo.code);
    formData.append("status", addTodo.status);

    try {
      await axios.post("http://localhost:4000/api/todos", formData, {
        headers: {
          Authorization: "Bearer " + cookies.token,
        },
      });

      window.location.reload();
      setShowModal(false);
      setLoading(false);
    } catch (err) {
      console.log(
        "Error updating/adding todo:",
        err.response ? err.response.data : err,
      );
      setLoading(false);
    }
  };

  const handleDelete = async todoId => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/todos/${todoId}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.token,
          },
        },
      );
      if (response.status === 200) {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId));
      }
      setLoading(false);
    } catch (err) {
      console.error("Error add todos:", err.response ? err.response.data : err);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/todos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.token,
        },
      })
      .then(response => {
        setTodos(response.data.todos);
        setLoading(false);
      })
      .catch(err => {
        console.error(
          "Error fetching todos:",
          err.response ? err.response.data : err,
        );
        setLoading(false);
      });
  }, [cookies.token]);

  if (loading)
    return (
      <div>
        <Navbar />
        <p className="text-center">Loading...</p>
      </div>
    );

  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <>
      <div className="bg-dark d-none d-md-block">
        <Navbar />
        <Container>
          <Row>
            <Col className="mt-1 mb-3">
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
                className="w-50"
                style={{
                  marginTop: "110px",
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
                <InputGroup style={{ marginTop: "250px" }}>
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
                    <Modal.Title>New bug fixes</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={addTodo.title}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Error Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="errorDescription"
                          value={addTodo.errorDescription}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Fix Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="errorFix"
                          value={addTodo.errorFix}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="code"
                          value={addTodo.code}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Select
                        name="status"
                        value={addTodo.status}
                        onChange={handleChange}
                      >
                        <option>Has it been resolved?</option>
                        <option value="unresolved">Unresolved</option>
                        <option value="resolved">Resolved</option>
                      </Form.Select>
                    </Form>
                  </Modal.Body>
                  <div className="d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-danger w-25 mb-3 p-2 me-3"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-dark w-25 mb-3 p-2 me-3"
                    >
                      Add
                    </button>
                  </div>
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
                  {error ? (
                    <p className="text-danger">{error}</p>
                  ) : todos.length > 0 ? (
                    todos.map(todo => (
                      <div key={todo._id} style={{ minWidth: "600px" }}>
                        <div className="border p-3 flex-column">
                          <div className="d-flex justify-content-start mb-2">
                            <p>{`Posted by ${todo.creator.name.toUpperCase()}`}</p>
                            <p className="ms-2">on</p>
                            <p className="ms-2">
                              {new Date(todo.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <h5 className="text-start mb-3">{todo.title}</h5>
                          <div className="d-flex justify-content-end">
                            <Link
                              to={`/detail/${todo._id}`}
                              className="text-decoration-none border-0 btn btn-outline-info"
                            >
                              View
                            </Link>

                            <button
                              className="border-0 btn btn-outline-primary"
                              onClick={() => setShowModal(true)}
                            >
                              Update
                            </button>

                            <button
                              onClick={() => handleDelete(todo._id)}
                              className="border-0 btn btn-outline-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-light">No todos found</p>
                  )}
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
            <Col className="mt-2 mb-3">
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
                  marginTop: "100px",
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
                <InputGroup style={{ marginTop: "300px" }}>
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
                    <Modal.Title>New bug fixes</Modal.Title>
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
                        <Form.Label>Fix Description</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Code</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                      </Form.Group>
                      <Form.Select className="mb-5">
                        <option>Has it been resolved?</option>
                        <option value="unresolved">Unresolved</option>
                        <option value="resolved">Resolved</option>
                      </Form.Select>
                    </Form>
                  </Modal.Body>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-danger w-25 mb-5 p-2 me-3">
                      Cancel
                    </button>
                    <button className="btn btn-dark w-25 mb-5 p-2 me-3">
                      Accept
                    </button>
                  </div>
                </Modal>

                <div
                  style={{
                    marginTop: "25px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "19px",
                  }}
                >
                  {loading ? (
                    <p className="text-light">loading...</p>
                  ) : error ? (
                    <p className="text-danger">{error}</p>
                  ) : todos.length > 0 ? (
                    todos.map(todo => (
                      <div key={todo._id} className="border">
                        <div className="p-2 d-flex justify-content-start mb-2">
                          <p>Posted by {todo.creator.name}</p>
                          <p className="ms-1">on</p>
                          <p className="ms-1">
                            {new Date(todo.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <h5 className="ms-2 mb-2 text-start">{todo.title}</h5>
                        <div className="mb-2 d-flex justify-content-end">
                          <Link
                            to={`/detail/${todo._id}`}
                            className="text-decoration-none border-0 btn btn-outline-info"
                          >
                            View
                          </Link>
                          <button className="border-0 btn btn-sm btn-outline-primary">
                            Update
                          </button>
                          <button className="border-0 btn btn-sm btn-outline-danger">
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-light">No todos found</p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
