import { useState } from "react";
import Button from "./Button";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar expand="md" className="p-2 bg-dark text-white position-relative">
      <Container>
        <Nav.Link className="text-white fw-bold">Fixing The Bugs</Nav.Link>

        {/* Toggle Button (Mobile) */}
        <button
          className="d-md-none border-0 bg-transparent text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Navigation Menu with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 1 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="position-absolute top-100 start-0 w-100 bg-dark p-3 d-md-none"
            >
              <Nav className="d-flex flex-column align-items-center gap-3">
                <Button>Login</Button>
                <Button>Signup</Button>
              </Nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navigation */}
        <div className="d-none d-md-flex ms-auto">
          <Nav className="d-flex align-items-center gap-3">
            <Button>Login</Button>
            <Button>Signup</Button>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}
