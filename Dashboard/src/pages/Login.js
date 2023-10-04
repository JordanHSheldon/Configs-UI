import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { getCsgoData, reset } from "../features/csgoDataSlice";
import { useSelector, useDispatch } from "react-redux";

function Login() {
  const {data, isLoading, isError, message } = useSelector(
    (state) => state.userdata
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) { console.log(message);}
    dispatch(getCsgoData());

    return () => {
      dispatch(reset())
    };
  }, [navigate, dispatch, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }
  
  return (
    <>
      <section className="content">
      <form action=""> 
            <div>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email"/> 
            </div> 
            <div> 
                <label htmlFor="passw">Password</label>
                <input type="text" name="passw" id="passw"/> 
            </div>  
            <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
}

export default Login;