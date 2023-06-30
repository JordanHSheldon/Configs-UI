import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import settingsService from './settingsService'

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  settings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new setting
export const createSetting = createAsyncThunk(
  'settings/create',
  async (user, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await settingsService.createSetting(user/*, token*/)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user settings
export const getSettings = createAsyncThunk(
  'settings/getSettings',
  async (_, thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await settingsService.getSettings(user/*, token*/)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user setting
export const deleteSetting = createAsyncThunk(
  'settings/delete',
  async (thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await settingsService.deleteSetting(user /*, token*/)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSetting.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSetting.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.settings.push(action.payload)
      })
      .addCase(createSetting.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getSettings.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSettings.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.settings = action.payload
      })
      .addCase(getSettings.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.settings = action.payload
      })
      .addCase(deleteSetting.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSetting.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.settings = state.settings.filter(
          (setting) => setting._id !== action.payload.id
        )
      })
      .addCase(deleteSetting.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = settingsSlice.actions
export default settingsSlice.reducer