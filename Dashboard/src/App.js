import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer />
      <Navbar />
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/:taco" element={<Dashboard />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
