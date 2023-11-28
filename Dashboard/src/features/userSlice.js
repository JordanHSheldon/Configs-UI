import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService.js'

const initialState = {
  userdata: [],
  isSettingsError: false,
  isSettingsSuccess: false,
  isSettingsLoading: false,
  userMessage: '',
}

export const Login = createAsyncThunk(
  'user/login',
  async (x) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await userService.Login(x)
    } catch (error) {
      const userMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      return x.rejectWithValue(userMessage)
    }
  }
)

export const Register = createAsyncThunk(
  'user/register',
  async (x) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await userService.Register(x)
    } catch (error) {
      const userMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
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
      .addCase(Login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsSuccess = true
        state.userdata = action.payload
      })
      .addCase(Login.rejected, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsError = true
        state.userdata = action.payload
      })
      .addCase(Register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsSuccess = true
        state.userdata = action.payload
      })
      .addCase(Register.rejected, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsError = true
        state.userdata = action.payload
      })
  },
})

export const { userReset } = userSlice.actions
export default userSlice.reducer