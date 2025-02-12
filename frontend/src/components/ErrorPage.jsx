import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ErrorPage.css"; // Custom styles for background

const ErrorPage = () => {
  return (
    <div className="error-page d-flex align-items-center justify-content-center text-white text-center position-relative">
      {/* Semi-transparent overlay */}
      <div className="overlay"></div>

      {/* Animated Texts with Side Movement */}
      <motion.h2
        className="position-absolute top-0 start-50 translate-middle-x fw-bold"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: [0, -20, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0,
        }}
      >
        PAGE NOT FOUND
      </motion.h2>

      <motion.h2
        className="position-absolute bottom-0 start-50 translate-middle-x fw-bold"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: [0, 20, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        PAGE NOT FOUND
      </motion.h2>

      <motion.h3
        className="position-absolute top-50 start-0 translate-middle-y fw-bold"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: [-30, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        404
      </motion.h3>

      <motion.h3
        className="position-absolute top-50 start-50 translate-middle fw-bold"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        500
      </motion.h3>

      <motion.h3
        className="position-absolute top-50 end-0 translate-middle-y fw-bold"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: [30, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        INTERNAL SERVER
      </motion.h3>
    </div>
  );
};

export default ErrorPage;

// import ErrorPage from "./components/ErrorPage";
// import image from "./assets/img/Group.png";
// <div style={{ background: "grey", position: "relative", width: "1260px" }}>
//   <img src={image} width="100%" style={{ display: "block" }} />
//   <div
//     style={{
//       position: "absolute",
//       top: "20px",
//       left: "50px",
//       color: "black",
//       fontSize: "24px",
//       fontWeight: "bold",
//       padding: "10px",
//       borderRadius: "5px",
//     }}
//   >
//     <h3 className="fw-bold">Your Text Here</h3>
//   </div>
// </div>
