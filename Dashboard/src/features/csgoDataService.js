import axios from 'axios'
import Cookies from "universal-cookie";
const cookies = new Cookies();

// api urls
const getSettingsById = "https://esportscompare.azurewebsites.net/api/Data/GetDataByName"
const bearerToken = "bearer " + cookies.get("user");

// Get user settingsdata
const getCsgoData = async (x) => {
  let request = {
    username: x,
  };
  
  const response = await axios.post(getSettingsById, request,
   {
    headers: {
      Authorization: bearerToken,
      "Content-Type":"application/json"
    }
   }
  );

  return response.data;
}

const csgoDataService = {
  getCsgoData
}

export default csgoDataService;