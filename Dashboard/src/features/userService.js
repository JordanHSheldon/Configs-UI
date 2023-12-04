import axios from 'axios'

const LoginUrl = "https://localhost:44345/api/User/Login";
const RegisterUrl = "https://localhost:44345/api/Data/GetDataById";

// Login user
const Login = async (loginRequest) => {
  let request = { 
    Username: loginRequest.Username,
    Password: loginRequest.Password 
  }
  const response = await axios.post(LoginUrl, request);
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
  return response.data;
}

const userService = {
  Login,
  Register
}

export default userService;