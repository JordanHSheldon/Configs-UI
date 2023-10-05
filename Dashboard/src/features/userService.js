import axios from 'axios'

const loginurl = "http://localhost:3003/login"
const registerurl = "http://localhost:3003/signup"

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods':'POST, OPTIONS'
}

// login the user.
const login = async (req) => {
  try{
    console.log(req)
    const response = await axios.post(loginurl, req)
    console.log(response.data)
    return response.data
  }
  catch(err){
    console.log(err)
  }
}

// register the user    
const register = async (req) => {
  try{
    console.log(req)
    const response = await axios.post(registerurl, req)
    console.log(response.data)
    return response.data
  }
  catch(err){
    console.log(err.message)
  }
}

const userService = {
  login,
  register
}

export default userService;