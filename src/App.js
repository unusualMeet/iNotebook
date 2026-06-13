import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <NoteState>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                localStorage.getItem("token") ? (
                  <Home showAlert={showAlert} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/about"
              element={
                localStorage.getItem("token") ? (
                  <About />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/signup"
              element={<Signup showAlert={showAlert} />}
            />

            <Route
              path="/login"
              element={<Login showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;