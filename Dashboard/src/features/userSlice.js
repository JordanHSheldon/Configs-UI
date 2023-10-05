import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  userdata: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const login = createAsyncThunk(
  'userdata/get',
  async (thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await userService.login(initialState.userdata)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const register = createAsyncThunk(
  'userdata/save',
  async ({ fname, lname, username, email, password, cpassword },thunkAPI) => {
    let newUser = new Object({fname,lname, username, email, password});
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await userService.register(newUser)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userdata = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.userdata = action.payload
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userdata = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.userdata = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer