import ErrorPage from "./components/ErrorPage";
import image from "./assets/img/Group.png";

function App() {
  return (
    <div style={{ background: "grey", position: "relative", width: "1260px" }}>
      <img src={image} width="100%" style={{ display: "block" }} />
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
        <h3 className="fw-bold">Your Text Here</h3>
      </div>
    </div>
  );
}

export default App;
