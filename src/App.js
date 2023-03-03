import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import { ForgetPassword } from "./pages/ForgetPassword";
import { Dashboard } from "./pages/Dashboard";

import { ToastContainer } from "react-toastify";
import { PrivateRouter } from "./pages/PrivateRouter";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Registration />} />
          <Route path="password-reset" element={<ForgetPassword />} />

          <Route
            path="dashboard"
            element={
              <PrivateRouter>
                <Dashboard />
              </PrivateRouter>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
