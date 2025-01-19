import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import NavBar from '../Components/Navbar/navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Peripherals from '../Pages/Peripherals/page';
import Login from '../Pages/Login/page';
import Register from '../Pages/Register/page';
import Players from '../Pages/Players/page';
import Profile from '../Pages/Profile/page';
import './App.css'
import { useUserStore } from '../store';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import Edit from '../Pages/edit/page';

function App() {
  const { getUser } = useUserStore();
  const [cookies] = useCookies(['user']);

  useEffect(() => {
    if (cookies.user) {
      getUser(cookies.user);
    }
  },[cookies.user, getUser]);

  return (
    <>
      <Header />
      <NavBar />
      <div className='container'>
        <div className='cellOutside'></div>
          <div className='cellMiddle'>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/peripherals" element={<Peripherals />} />
                <Route path="/players" element={<Players />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit" element={<Edit />} />
              </Routes>
            </BrowserRouter>
          </div>
        <div className='cellOutside'></div>
      </div>
      <Footer />
    </>
  )
}

export default App;