`use client`;

import { createSlice } from "@reduxjs/toolkit";

interface CurrentChartState {
  currentCharts: string[];
}

const initialState: CurrentChartState = {
  currentCharts: [],
};

const currentChartsSlice = createSlice({
  name: "currentCharts",
  initialState,
  reducers: {
    changeCurrentCharts(state, action) {
      state.currentCharts = action.payload;
    },
  },
});

export const { changeCurrentCharts } = currentChartsSlice.actions;
export default currentChartsSlice.reducer;
