import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <p className="text-center mt-4">
              <Link className="text-decoration-none" to="/">
                Home Page
              </Link>
            </p>
            <h2 className="text-center mt-4">404 Page NotFound</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
