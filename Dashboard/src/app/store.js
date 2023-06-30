import { configureStore } from '@reduxjs/toolkit';
import csgoDataReducer from '../features/csgoDataSlice';
export const store = configureStore({
    reducer:{
        csgodata:csgoDataReducer
    },
});