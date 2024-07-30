'use client'

import { useCookies } from 'next-client-cookies';
import "./navBar.css"
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SideNav = () => {
  const cookieStore = useCookies();
  const user = cookieStore.get('user');
  const [search, setSearch] = useState("");
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `/players?name=${encodeURIComponent(search)}`;
    router.push(url);
    return;
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href='/'><img src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-house-icon-png-image_4013530.jpg" alt="Logo"></img></a>
      </div>
      <div className="navbar-right">
        <form className="search-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}></input>
        </form>
        {user ? 
        <>
          <div className="navbar-right">
            <a href='/profile'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb51ZwKCKqU4ZrB9cfaUNclbeRiC-V-KZsfQ&s" alt="Logo"></img></a>
          </div>
          <div className="navbar-right">
          <a href='/logout'><img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/logout-2651139-2198213.png?f=webp&w=256" alt="Logo"></img></a>
        </div>
        </> 
          : 
          <a href="/login" className="login-btn">Login / Signup</a>
        }
      </div>
    </nav>
  );
};

export default SideNav;


