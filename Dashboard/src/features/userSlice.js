import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService.js'


const initialState = {
  userdata: [],
  isSettingsError: false,
  isSettingsSuccess: false,
  isSettingsLoading: false,
  userMessage: '',
}

export const login = createAsyncThunk(
  'login',
  async (x) => {
    try {
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

export const register = createAsyncThunk(
  'register',
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