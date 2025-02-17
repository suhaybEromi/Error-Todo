import Todos from "./components/Todos";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import imageUrl from "./assets/img/laptop.png";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-dark">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
          <Route path="/" element={<Todos />} />
          {/* <Route path="/" element={<ErrorPage />} /> */}
        </Routes>
        <br />
      </BrowserRouter>
    </div>
  );
}

export default App;
