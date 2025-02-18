import Todos from "./components/Todos";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Detail from "./components/Detail";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <br />
      </BrowserRouter>
    </div>
  );
}

export default App;
