import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import NavBar from '../Components/Navbar/navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Peripherals from '../Pages/Peripherals/page';
import Login from '../Pages/Login/page';
import Register from '../Pages/Register/page';
import Profile from '../Pages/Profile/page';
import Profiles from '../Pages/Profiles/page';
import Logout from '../Pages/Logout/page';
import { useEffect } from 'react';
import Edit from '../Pages/edit/page';
import { useUserStore } from '../store';
import './App.css'

function App() {
  const { getUser } = useUserStore();
  const { user } = useUserStore();
  const { profile } = useUserStore();
  
  useEffect(() => {
    if(profile === undefined){
      getUser();
    }
  },[user,getUser,profile]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <NavBar />
        <div className='container'>
          <div className='cellOutside'></div>
            <div className='cellMiddle'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/peripherals" element={<Peripherals />} />
                <Route path="/players" element={<Profiles />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Home />} />
              </Routes>
              <Footer />
            </div>
          <div className='cellOutside'></div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;