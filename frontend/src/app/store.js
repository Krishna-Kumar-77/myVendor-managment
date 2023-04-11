import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import vendorReducer from '../features/vendors/vendorSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendor: vendorReducer,
  },
})
