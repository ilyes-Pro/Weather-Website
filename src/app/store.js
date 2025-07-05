

import { configureStore } from '@reduxjs/toolkit'

import apiReducer from '../features/API/APISlice'
export const store = configureStore({
    reducer: {
        api: apiReducer
    },
})