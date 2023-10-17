`use client`;

import { createSlice } from "@reduxjs/toolkit";

interface CurrentChartState {
  currentCharts: string[];
  currentTimePeriod: string;
}

const initialState: CurrentChartState = {
  currentCharts: ["bitcoin"],
  currentTimePeriod: "1",
};

const currentChartsSlice = createSlice({
  name: "currentCharts",
  initialState,
  reducers: {
    changeCurrentCharts(state, action) {
      state.currentCharts = action.payload;
    },
    changeTimePeriod(state, action) {
      state.currentTimePeriod = action.payload;
    },
  },
});

export const { changeCurrentCharts, changeTimePeriod } =
  currentChartsSlice.actions;
export default currentChartsSlice.reducer;
