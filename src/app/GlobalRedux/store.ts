`use client`;

import { configureStore } from "@reduxjs/toolkit";
import marketTableReducer from "./Features/MarketTable/marketTableSlice"
import currencyReducer from "./Features/CurrencySlice/currencySlice";

export const store = configureStore({
    reducer: {
        marketTable: marketTableReducer,
        currency: currencyReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>