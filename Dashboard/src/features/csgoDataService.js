import axios from 'axios'

const getSettingsById = "https://localhost:5001/api/Data/GetDataByName"

// Get user settingsdata
const getCsgoData = async (x) => {
  let request = { 
    Alias: x
  }

  const response = await axios.post(getSettingsById, request);
  return response.data;
}

const csgoDataService = {
  getCsgoData
}

export default csgoDataService;