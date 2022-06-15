import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/login";
import UploadSheet from "./components/UploadSheet";

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<UploadSheet />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
