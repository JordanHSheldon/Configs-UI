import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import { useEffect } from "react";
import "./home.css"

const Home = () => {
  const { profile } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
  }, [profile,navigate]);

  return (
    <div className='home-page'>
      <h1>Store your Config</h1>
      <p>We allow you to update store and share your gaming configs :p</p>
    </div>
  )
}

export default Home;