`use client`;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "usd",
  currentChart: "bitcoin",
  loading: false,
  error: "",
};

const APIStateSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurrency(state, action) {
      state.currency = action.payload;
    },
    changeChart(state, action) {
      state.currentChart = action.payload;
    },
  },
});

export const { changeCurrency, changeChart } = APIStateSlice.actions;
export default APIStateSlice.reducer;
