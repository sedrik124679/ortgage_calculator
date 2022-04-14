import {configureStore} from "@reduxjs/toolkit";
import banksReducer from './banksSlice';

export default configureStore({
    reducer: {
        banks: banksReducer
    }
})