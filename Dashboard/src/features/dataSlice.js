import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dataService from './dataService'

const initialState = {
  csgodata: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const getData = createAsyncThunk(
  'csgodata/get',
  async (x) => {
    try {
      return await dataService.getData(x)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      return x.rejectWithValue(message)
    }
  }
)

export const updateData = createAsyncThunk(
  'csgodata/update',
  async (x) => {
    try {
      console.log(x);
      let result = await dataService.updateData(x);

      console.log(result);
      return result;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      return x.rejectWithValue(message)
    }
  }
)

export const dataSlice = createSlice({
  name: 'csgodata',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.csgodata = action.payload
      })
      .addCase(getData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.csgodata = action.payload
      })
      .addCase(updateData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateData.fulfilled, (state,action) => {
        state.isLoading = false
        state.isSuccess = true
        state.csgodata = action.payload
      })
      .addCase(updateData.rejected, (state,action) => {
        state.isLoading = false
        state.isError = true
        state.csgodata = action.payload
      })
  },
})

export const { reset } = dataSlice.actions
export default dataSlice.reducer