import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService.js'
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
const cookies = new Cookies();

const initialState = {
  userdata: [],
  isSettingsError: false,
  isSettingsSuccess: false,
  isSettingsLoading: false,
  userMessage: '',
}

const errMsgs = ["Not found","Error creating user data","User Already Exists",undefined];

const checkResult = (payload) => {
  var result = false;
  errMsgs.forEach(element => {
    if(payload.result === element){
      result = true;
    };
  });

  return result;
}

export const login = createAsyncThunk(
  'login',
  async (x) => {
    try {
      var result = await userService.Login(x);
      if(checkResult(result) === true){
        throw new Error(result);
      }

      cookies.set("user", result.result, 10000);
      toast.success('Login successful!', {
        position:"top-right",
      });
      return result;
    } catch (error) {
      const userMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
        toast.error('Login failed. Please try again.',error.message);
      return x.rejectWithValue(userMessage)
    }
  }
)

export const register = createAsyncThunk(
  'register',
  async (x) => {
    try {
      var result = await userService.Register(x)
      if(checkResult(result) === true){
        throw new Error(result);
      }

      cookies.set("user", result.result, 10000);
      toast.success('Login successful!', {
        position:"top-right",
      });
      return result;
    } catch (error) {
      const userMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
        toast.error('Login failed. Please try again.',error.message);
      return x.rejectWithValue(userMessage)
    }
  }
)

export const userSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    userReset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsSuccess = true
        console.log(state.userdata)
        state.userdata = action.payload
        console.log(state.userdata)
      })
      .addCase(login.rejected, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsError = true
        state.userdata = action.payload
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsSuccess = true
        state.userdata = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsError = true
        state.userdata = action.payload
      })
  },
})

export const { userReset } = userSlice.actions
export default userSlice.reducer