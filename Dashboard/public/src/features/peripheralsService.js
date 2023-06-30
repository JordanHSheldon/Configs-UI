import axios from 'axios'

const GetAllPeripherals = '/api/Peripherals/GetAllPeripherals/'

// Create new goal
const createPeripheral = async (settingsData/*, token*/) => {
  // const config = {
  //   headers: {
  //     //Authorization: `Bearer ${token}`,
  //   },
  // }

  //const response = await axios.post(API_URL+"/GetAllSettings/", goalData)
  //localStorage.setItem("settings", JSON.stringify(response.data));
  //return response.data
  return ""
}

// Get user goals
const getPeripherals = async (user) => {
  const response = await axios.post(GetAllPeripherals ,user)
  console.log(response);
  return response.data
}

// Delete user goal
const deletePeripheral = async (PeripheralsId, token) => {
  // const config = {
  //   headers: {
  //     //Authorization: `Bearer ${token}`,
  //   },
  // }

  //const response = await axios.delete(API_URL + goalId)
  // return response.data
  return ""
}

const peripheralsService = {
  createPeripheral,
  getPeripherals,
  deletePeripheral,
}

export default peripheralsService;