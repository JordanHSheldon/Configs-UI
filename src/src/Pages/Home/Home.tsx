import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./home.css"

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
  }, [navigate]);

  return (
    <div className='home-page'>
      <h1>Store your Config</h1>
      <p>We allow you to update store and share your gaming configs</p>
    </div>
  )
}

export default Home;