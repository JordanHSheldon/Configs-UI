import { useUserStore } from "../../store";
import { useEffect } from "react";
import "./navBar.css"
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { profile } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
  }, [profile,navigate]);
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
                { profile ? 
                  <ul className="nav-links-authenticated">
                    <div className="profile-wrapper">
                      <img onClick={()=>navigate("/profile")} src={profile.avatar}></img>

                      <ul className="profile-menu">
                        <li onClick={() => navigate("/logout")}>Logout</li>
                      </ul>
                    </div>
                  </ul>
                  : 
                  <ul className="nav-links-unauthenticated">
                    <span>
                      <a href={"/auth"}>Login</a>
                    </span>
                  </ul>
                }
            </div>
        </div>
    </div>
  );
};

export default NavBar;


