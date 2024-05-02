import axios from 'axios'

const LoginUrl = "https://esportscompare.azurewebsites.net/api/User/Login";
const RegisterUrl = "https://esportscompare.azurewebsites.net/api/User/Register";

// Login user
const Login = async (loginRequest) => {
  let request = { 
    Username: loginRequest.Username,
    Password: loginRequest.Password 
  }

  var response = await axios.post(LoginUrl, request);
  return response.data;
}

// Register user
const Register = async (registerRequest) => {
  let request = { 
    Email: registerRequest.Email,
    Password: registerRequest.Password,
    Username: registerRequest.Username
  }

  var response = await axios.post(RegisterUrl, request);
  return response.data;
}

const userService = {
  Login,
  Register
}



export default userService;