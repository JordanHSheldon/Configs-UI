import axios from 'axios'

const getUserById = "https://localhost:32786/api/User/GetUserById"

// Get user csgodata
const getUserData = async (id) => {
  try{
  let request = { 
    id: id
  }
  const response = await axios.post(getUserById, request,
    {
      auth:{ 
      username: 'jordan',
      password: 'password'
    }})
    console.log(response.data)
  return response.data
  }catch(err)
  {
    console.log(err.message)
  }
}

const userService = {
  getUserData
}

export default userService;