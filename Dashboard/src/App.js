import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer />
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
