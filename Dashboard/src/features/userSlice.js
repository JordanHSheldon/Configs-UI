import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const id = 0;

const initialState = {
  userdata: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getUserData = createAsyncThunk(
  'userdata/get',
  async (thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await userService.getCsgoData(id)
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
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.csgodata = action.payload
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.csgodata = action.payload
      })
  },
})

export const { reset } = userSlice.actions
export default userSlice.reducer