import Footer from '../Components/Footer/Footer'
import NavBar from '../Components/Navbar/navBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Peripherals from '../Pages/Peripherals/page';
import Profile from '../Pages/Profile/page';
import Profiles from '../Pages/Profiles/page';
import Logout from '../Pages/Logout/page';
import { useEffect } from 'react';
import Edit from '../Pages/edit/page';
import { useUserStore } from '../store';
import './App.css'
import Auth from '../Pages/Auth/page';

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
                <Route path="/edit" element={<Edit />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/auth" element={<Auth />} />
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