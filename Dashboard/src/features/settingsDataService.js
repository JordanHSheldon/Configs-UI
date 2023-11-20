import axios from 'axios'

const getSettingsById = "https://localhost:7191/api/Data/GetDataById"

// Get user csgodata
const getSettingsData = async (id) => {
  let request = { 
    id: id
  }
  const response = await axios.post(getSettingsById, request)
  console.log(response)
  return response.data
}

const settingsDataService = {
  getSettingsData
}

export default settingsDataService;