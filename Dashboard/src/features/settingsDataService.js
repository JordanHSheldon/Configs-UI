import axios from 'axios'

const getSettingsById = "https://localhost:32786/api/Data/GetDataById"

// Get user csgodata
const getSettingsData = async (id) => {
  try{
    let request = { 
      id: 0
    }
    const response = await axios.post(getSettingsById, request,
    {
      auth:{ 
        username: 'jordan',
        password: 'password'
      }
    })
    return response.data;
  }catch (err)
  {
    console.log(err.message)
  }
}
const settingsDataService = {
  getSettingsData
}

export default settingsDataService;