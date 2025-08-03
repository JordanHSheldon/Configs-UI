import { useUserStore } from "../../store";
import { useEffect } from "react";
import "./navBar.css"
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { profile } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
  }, [profile,navigate]);

  // const redirectYes = (x: string = "") => {
  //   console.log(x);
  //   navigate("/profile")
  // }

  return (
    <div className="navbar">
        <div className="navbar-content">
            <p className="logo" onClick={()=>navigate("/")}>Configs</p>
            <div className="navbar-left">
              <ul className="nav-links">
                  <li><span onClick={()=>navigate("/peripherals")}>Peripherals</span></li>
                  <li onClick={()=>navigate("/players")}>Players</li>
              </ul>
            </div>
            <div className="navbar-right">
                { profile !== undefined ? 
                  <ul className="nav-links">
                    <li onClick={()=>navigate("/profile")}>{profile?.userName}</li>
                    <li onClick={()=>navigate("/logout")}>Logout</li>
                  </ul>
                  : 
                  <ul className="nav-links">
                    <li><a href="/login">Login</a></li>
                  </ul>
                }
            </div>
        </div>
    </div>
  );
};

export default NavBar;


