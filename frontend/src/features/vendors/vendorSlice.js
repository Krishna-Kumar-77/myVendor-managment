import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import vendorService from './vendorService'

const initialState = {
  vendorList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new vendor
export const createVendor = createAsyncThunk(
  'vendors/create',
  async (vendorData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await vendorService.createVendor(vendorData, token)
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

// Get user vendors
export const getVendors = createAsyncThunk(
  'vendors/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await vendorService.getVendors(token)
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

// Delete user vendor
export const deleteVendor = createAsyncThunk(
  'vendors/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await vendorService.deleteVendor(id, token)
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

export const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    reset: (state) => state.initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVendor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.vendorList.push(action.payload)
      })
      .addCase(createVendor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getVendors.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getVendors.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.vendorList = action.payload
      })
      .addCase(getVendors.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
     
      .addCase(deleteVendor.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteVendor.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.vendorList = state.vendorList.filter(
          (vendor) => vendor._id !== action.payload.id
        )
      })
      .addCase(deleteVendor.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = vendorSlice.actions
export default vendorSlice.reducer
