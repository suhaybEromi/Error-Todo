import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";
import imageLaptop from "../assets/img/laptop.png";

export default function Detail() {
  return (
    <>
      <Navbar />
      <div>
        <Container>
          <Row>
            <Col xl="12">
              <h2 className="mt-3 d-flex justify-content-center">Title</h2>
            </Col>
            <Col xl="12">
              <p className="mt-2 d-flex justify-content-center">
                Created By {"Suhayb Mohammed"} on 2/6/2025
              </p>
              <hr className="border-2" />
            </Col>
            <Col>
              <p className="mt-4 d-flex justify-content-center">
                <img src={imageLaptop} width="350" />
              </p>
            </Col>
            <Col xl="12">
              <p className="mt-4 d-flex justify-content-center">
                🛑 Error Description
              </p>
            </Col>
            <Col xl="12">
              <p className="mt-4 d-flex justify-content-center">✅ Error Fix</p>
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
                  <code>
                    {`// Example of a longer JavaScript function
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched data:", data);
      return data;
    })
    .catch(error => {
      console.error("Fetching error:", error);
    });
}

// Call the function
fetchData("https://api.example.com/data");`}
                  </code>
                </pre>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
