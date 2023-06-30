import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import peripheralsService from './peripheralsService'

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  peripherals: [],
  isPeripheralError: false,
  isPeripheralSuccess: false,
  isPeripheralLoading: false,
  Peripheralmessage: '',
}

// Create new Peripherals
export const createPeripheral = createAsyncThunk(
  'peripherals/create',
  async (user, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await peripheralsService.createPeripheral(user/*, token*/)
    } catch (error) {
      const Peripheralmessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(Peripheralmessage)
    }
  }
)

// Get user Peripherals
export const getPeripherals = createAsyncThunk(
  'peripherals/getPeripherals',
  async (_, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await peripheralsService.getPeripherals(user/*, token*/)
    } catch (error) {
      const Peripheralmessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(Peripheralmessage)
    }
  }
)

// Delete user Peripherals
export const deletePeripheral = createAsyncThunk(
  'peripherals/delete',
  async (thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await peripheralsService.deletePeripheral(user /*, token*/)
    } catch (error) {
      const Peripheralmessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(Peripheralmessage)
    }
  }
)

export const peripheralsSlice = createSlice({
  name: 'peripherals',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPeripheral.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPeripheral.fulfilled, (state, action) => {
        state.isPeripheralLoading = false
        state.isPeripheralSuccess = true
        state.peripherals.push(action.payload)
      })
      .addCase(createPeripheral.rejected, (state, action) => {
        state.isPeripheralLoading = false
        state.isPeripheralError = true
        state.Peripheralmessage = action.payload
      })
      .addCase(getPeripherals.pending, (state) => {
        state.isPeripheralLoading = true
      })
      .addCase(getPeripherals.fulfilled, (state, action) => {
        state.isPeripheralLoading = false
        state.isPeripheralSuccess = true
        state.peripherals = action.payload
      })
      .addCase(getPeripherals.rejected, (state, action) => {
        state.isPeripheralLoading = false
        state.isPeripheralError = true
        state.peripherals = action.payload
      })
      .addCase(deletePeripheral.pending, (state) => {
        state.isPeripheralLoading = true
      })
      .addCase(deletePeripheral.fulfilled, (state, action) => {
        state.isPeripheralLoading = false
        state.isPeripheralSuccess = true
        state.peripherals = state.peripherals.filter(
          (peripheral) => peripheral._id !== action.payload.id
        )
      })
      .addCase(deletePeripheral.rejected, (state, action) => {
        state.isPeripheralLoading = false
        state.isPeripheralError = true
        state.Peripheralmessage = action.payload
      })
  },
})

export const { reset } = peripheralsSlice.actions
export default peripheralsSlice.reducer