`use client`;

import { configureStore } from "@reduxjs/toolkit";
import marketTableReducer from "./Features/MarketTable";
import currencyReducer from "./Features/CurrencySlice";
import globalReducer from "./Features/GlobalSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    marketTable: marketTableReducer,
    currency: currencyReducer,
    globalData: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
