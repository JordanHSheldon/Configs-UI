import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import settingsReducer from '../features/settingsSlice';
import peripheralsReducer from '../features/peripheralsSlice';
export const store = configureStore({
    reducer:{
        auth: authReducer,
        settings:settingsReducer,
        peripherals:peripheralsReducer
    },
});