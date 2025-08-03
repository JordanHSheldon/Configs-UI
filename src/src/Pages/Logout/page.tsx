import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner/spinner';
import { useUserStore } from '../../store';

export default function Page() {
   const navigate = useNavigate();
   const { logout } = useUserStore();

  useEffect(() => {
    logout();
    navigate("/");
  },[logout, navigate]);

  return (
    <Spinner />
  );
};