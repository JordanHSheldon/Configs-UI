import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./Components/NavBar/Navbar";
import Bot from "./pages/Bot";
import About from "./pages/About";
import Footer from "./Components/Footer";
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
            <Route path="/About" element={<Bot />} />
            <Route path="/Bot" element={<About />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
