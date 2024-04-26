import axios from 'axios'
import Cookies from "universal-cookie";
const cookies = new Cookies();

// api urls
const getSettingsById = "https://esportscompare.azurewebsites.net/api/Data/GetData"
const UpdateDataEndpoint = "https://esportscompare.azurewebsites.net/api/Data/UpdateData"

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

const updateData = async (x) => {
  let request = {
    "sensitivity": 1,
    "dpi": 800,
    "resolutionX": 1920,
    "resolutionY": 1080,
    "resolutionType": "DEBUG",
    "mouse": "DEBUG",
    "mousePad": "DEBUG",
    "keyBoard": "DEBUG",
    "headSet": "DEBUG",
    "monitor": "DEBUG"
  };
  console.log(request);
  const response = await axios.post(UpdateDataEndpoint, request,
    {
     headers: {
       Authorization: bearerToken,
       "Content-Type":"application/json"
     }
    }
  );

  console.log(response.data);
  return response.data;
};

const csgoDataService = {
  getCsgoData,
  updateData
}

export default csgoDataService;