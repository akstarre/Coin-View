`use client`;

import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import marketTableReducer from "./Features/MarketTableSlice";
import currencyReducer from "./Features/CurrencySlice";
import coinChartReducer from "./Features/CoinChartSlice";
import globalReducer from "./Features/GlobalSlice";
import currentChartsReducer from "./Features/CurrentChartSlice";

export const store = configureStore({
  reducer: {
    marketTable: marketTableReducer,
    currency: currencyReducer,
    globalData: globalReducer,
    coinChart: coinChartReducer,
    currentCharts: currentChartsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
