import { configureStore } from '@reduxjs/toolkit';
import csgoDataReducer from '../features/csgoDataSlice';
import userReducer from '../features/userSlice';
export const store = configureStore({
    reducer:{
        csgodata:csgoDataReducer,
        userdata:userReducer
    }
});