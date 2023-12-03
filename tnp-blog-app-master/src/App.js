import React from "react";
import "./App.scss";
import "firebase/auth";
import { AuthProvider } from "./providers/auth";
import Routes from "./routes";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { Collapse } from "bootstrap";

function App() {
  return (
    <AuthProvider>
      <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="navbar-brand col-sm-2 d-flex justify-content-center"> <h3><i>╚ƁLOGARIX╗</i></h3></div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon "></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="col-sm-2 d-flex justify-content-center">
            <Link to="/">
              <div className="nav-item text-white">🏠 Home</div>
            </Link>
          </div>
          <div className="col-sm-2 d-flex justify-content-center">
            <Link to="/register">
              <div className="text-white">📝 Register</div>
            </Link>
          </div>
          <div className="col-sm-2 d-flex justify-content-center">
            <Link to="/">
              <div className="text-white">⎆ Login</div>
            </Link>
          </div>
          <div className="col-sm-2 d-flex justify-content-center">
            <Link to="/about" className="nav-item">
              <div className="text-white">🔖 About</div>
            </Link>
          </div>
          <div className="col-sm-2 d-flex justify-content-center">
            <Link to="/search">
              <div className="text-white">🔍Search</div>
            </Link>
          </div>
        </div>
      </nav>
      <Routes />
    </AuthProvider>
  );
}
//git add .
//git commit -m "meesage"
//git push

export default App;
