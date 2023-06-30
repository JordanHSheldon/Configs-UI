import axios from 'axios'

const getPlayerStatsbySteamId = 'http://127.0.0.1:8000/get_player_data'

// Get user csgodata
const getCsgoData = async (id) => {
  let request = { 
    id: id
  }
  const response = await axios.post(getPlayerStatsbySteamId, request)
  return response.data
}

const csgoDataService = {
  getCsgoData
}

export default csgoDataService;