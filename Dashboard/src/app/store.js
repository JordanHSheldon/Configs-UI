import { configureStore } from '@reduxjs/toolkit';
import csgoDataReducer from '../features/csgoDataSlice';
import settingsDataReducer from '../features/settingsDataSlice';
export const store = configureStore({
    reducer:{
        settingsdata:settingsDataReducer,
        csgodata:csgoDataReducer,
    }
});