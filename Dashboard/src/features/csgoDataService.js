import axios from 'axios'

const getSettingsById = "https://localhost:44345/api/Data/GetDataByName"
var auth = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJ1bmlxdWVfbmFtZSI6Ik5BRFJPSiIsImVtYWlsIjoiSm9yZGFuaHNoZWxkb25AZ21haWwuY29tIiwibmJmIjoxNzAxOTY3MDI2LCJleHAiOjE3MDE5Njg4MjYsImlhdCI6MTcwMTk2NzAyNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDAifQ.AmOhdo9WcdlnwdmsWkwtJ6c5AXkIL7KZ8TgNsjwz66Y";
// Get user settingsdata
const getCsgoData = async (x) => {
  let request = {
    Alias: x,
  };

  const response = await axios.post(getSettingsById, request,
   {
    headers: {
      Authorization: auth
    }
   }
  );

  return response.data;
}

const csgoDataService = {
  getCsgoData
}

export default csgoDataService;