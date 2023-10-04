import { configureStore } from '@reduxjs/toolkit';
import csgoDataReducer from '../features/csgoDataSlice';
import settingsDataReducer from '../features/settingsDataSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
    reducer:{
        settingsdata:settingsDataReducer,
        csgodata:csgoDataReducer,
        userdata:userReducer
    }
});