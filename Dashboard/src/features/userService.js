import axios from 'axios'
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginUrl = "https://localhost:44345/api/User/Login";
const RegisterUrl = "https://localhost:44345/api/User/Register";

// Login user
const Login = async (loginRequest) => {
  let request = { 
    Username: loginRequest.Username,
    Password: loginRequest.Password 
  }

  const response = await axios.post(LoginUrl, request);
    
  if(response.data !== undefined){
    cookies.set("user",response.data.token,10000);
  }
  return response.data;
}

// Register user
const Register = async (registerRequest) => {
  let request = { 
    Email: registerRequest.Email,
    Password: registerRequest.Password,
    Username: registerRequest.Username
  }
  const response = await axios.post(RegisterUrl, request);
  if(response.data !== undefined){
    cookies.set("user",response.data.token,10000);
  }
  return response.data;
}

const userService = {
  Login,
  Register
}

export default userService;