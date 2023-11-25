import axios from 'axios'

// const getPlayerStatsbySteamId = 'http://127.0.0.1:8000/get_all_data'
const getSettingsById = "https://localhost:32770/api/Data/GetDataByName"

// Get user csgodata
const getCsgoData = async (x) => {
  console.log(x);
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