import "./navBar.css"
import { useUserStore } from "../../store";

const NavBar = () => {
   const { user } = useUserStore();
  return (
    <div className="navbar">
        <div className="navbar-content">
            <a href="/" className="logo">Configs</a>
            <div className="navbar-left">
              <ul className="nav-links">
                  <li><a href="/peripherals">Peripherals</a></li>
                  <li><a href="/players">Players</a></li>
              </ul>
            </div>
            <div className="navbar-right">
              <ul className="nav-links">
                {user?.userName ? <li><a href="profile">{user.userName}</a></li> : <li><a href="/login">login</a></li>}
              </ul>
            </div>
        </div>
    </div>
  );
};

export default NavBar;


