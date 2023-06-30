import axios from "axios";

const registerPlayer = "/api/Player/Register";
const loginPlayer = "/api/Player/Login/";

// register user
const register = async (userData) => {
  const response = await axios.post(registerPlayer, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(loginPlayer, userData);
  if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
