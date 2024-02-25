import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div className="container">
          <ToastContainer className="toast-position"
            position="top-center"
            autoClose={10000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/profile/:user" element={<Dashboard />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
}

export default App;
