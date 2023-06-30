import axios from 'axios'

const GetAllSettings = '/api/Settings/GetAllSettings/'

// Create new goal
const createSetting = async (settingsData/*, token*/) => {
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
const getSettings = async (user) => {
  const response = await axios.post(GetAllSettings ,user)
  console.log(response);
  return response.data
}

// Delete user goal
const deleteSetting = async (settingsId, token) => {
  // const config = {
  //   headers: {
  //     //Authorization: `Bearer ${token}`,
  //   },
  // }

  //const response = await axios.delete(API_URL + goalId)
  // return response.data
  return ""
}

const settingsService = {
  createSetting,
  getSettings,
  deleteSetting,
}

export default settingsService;