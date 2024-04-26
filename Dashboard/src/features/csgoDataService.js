import axios from 'axios'
import Cookies from "universal-cookie";
const cookies = new Cookies();

// api urls
const getSettingsById = "https://esportscompare.azurewebsites.net/api/Data/GetData"
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
    Sensitivity:1,
    Dpi:400,
    ResolutionX:1920,
    ResolutionY:1080,
    ResolutionType:"DEBUG",
    Mouse: "DEBUG", 
    MousePad: "DEBUG",
    KeyBoard: "DEBUG",
    HeadSet: "DEBUG",
    Monitor: "DEBUG",
  };
  console.log(request);
  const response = await axios.post(getSettingsById, request,
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