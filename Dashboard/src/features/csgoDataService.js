import axios from 'axios'

// const getPlayerStatsbySteamId = 'http://127.0.0.1:8000/get_all_data'
const getSettingsById = "https://localhost:7191/api/Data/GetDataById"

// Get user csgodata
const getCsgoData = async (id) => {
  let request = { 
    id: id
  }
  const response = await axios.post(getSettingsById, request)
  return response.data
}

const csgoDataService = {
  getCsgoData
}

export default csgoDataService;