`use client`;

import { configureStore } from "@reduxjs/toolkit";
import marketTableReducer from "./Features/MarketTable/marketTableSlice";
import currencyReducer from "./Features/CurrencySlice/currencySlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    marketTable: marketTableReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
