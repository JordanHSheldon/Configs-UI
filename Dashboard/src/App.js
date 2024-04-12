import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./Components/NavBar/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/profile/:user" element={<Dashboard />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </Router>
      <Footer />
      <ToastContainer
        position="top-right"
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={true}
        theme="dark"
      ></ToastContainer>
    </>
  );
}

export default App;
