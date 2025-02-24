import Todos from "./components/Todos";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Detail from "./components/Detail";
import AuthContextProvider from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Todos />} />
              </Route>

              <Route path="/detail" element={<PrivateRoute />}>
                <Route path="/detail/:todoId" element={<Detail />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AuthContextProvider>
    </>
  );
}

export default App;
