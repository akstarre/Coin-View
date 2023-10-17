`use client`;

import { createSlice } from "@reduxjs/toolkit";

interface CurrencyState {
  currency: string;
  loading: boolean;
  error: string;
}

const initialState: CurrencyState = {
  currency: "usd",
  loading: false,
  error: "",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency(state, action) {
      state.currency = action.payload;
    },
  },
});

export const { changeCurrency } = currencySlice.actions;
export default currencySlice.reducer;
