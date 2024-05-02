import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/dataSlice';
import userReducer from '../features/userSlice';
export const store = configureStore({
    reducer:{
        csgodata:dataReducer,
        userdata:userReducer
    }
});