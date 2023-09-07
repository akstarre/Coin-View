`use client`;

import { configureStore } from "@reduxjs/toolkit";
import marketTableReducer from "./Features/MarketTable/marketTableSlice"

export const store = configureStore({
    reducer: {
        marketTable: marketTableReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>