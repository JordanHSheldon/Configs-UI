import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import csgoDataService from './csgoDataService'

const id = JSON.parse(localStorage.getItem("id"));

const initialState = {
  csgodata: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getCsgoData = createAsyncThunk(
  'csgodata/get',
  async (thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await csgoDataService.getCsgoData(id)
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

export const csgoDataSlice = createSlice({
  name: 'csgodata',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCsgoData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCsgoData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.csgodata = action.payload
        console.log(state.data)
      })
      .addCase(getCsgoData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.csgodata = action.payload
      })
  },
})

export const { reset } = csgoDataSlice.actions
export default csgoDataSlice.reducer