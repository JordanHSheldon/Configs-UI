import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/Navbar/navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Peripherals from '../Pages/Peripherals/page';
import Profile from '../Pages/Profile/page';
import Profiles from '../Pages/Profiles/page';
import Logout from '../Pages/Logout/page';
import { useEffect } from 'react';
import { useUserStore } from '../store';
import Auth from '../Pages/Auth/page';
import OtherProfile from '../Pages/OtherProfile/page';
import './App.css'

function App() {
  const { initializeAuth } = useUserStore();
  useEffect(() => {
    const load = async () => {
      await initializeAuth();
    };
    load();
  },[initializeAuth]);

  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <NavBar />
        <div className='container'>
          <div className='cell-outside'></div>
            <div className='cell-middle'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/peripherals" element={<Peripherals />} />
                <Route path="/players" element={<Profiles />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/u/*" element={<OtherProfile />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
          <div className='cell-outside'></div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;