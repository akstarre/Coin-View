`use client`;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ChartData {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

interface CoinChartState {
  charts: {
    [coinName: string]: {
      [timePeriod: string]: ChartData;
    };
  };
  loading: boolean;
  error: string;
}

export const fetchCoinChart = createAsyncThunk(
  "coinChart/getCoinChart",
  async (
    {
      coinId,
      currency,
      timePeriod,
    }: { coinId: string; currency: string; timePeriod: string },
    thunkApi
  ) => {
    const COIN_URL = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${timePeriod}`;
    const response = await fetch(COIN_URL);
    const data = await response.json();
    return data;
  }
);

const initialState: CoinChartState = {
  charts: {},
  loading: false,
  error: "",
};

const coinChartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinChart.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCoinChart.fulfilled, (state, action) => {
        const { coinId, timePeriod, data } = action.payload;
        if (!state.charts[coinId]) {
          state.charts[coinId] = {};
        }
        state.charts[coinId][timePeriod] = data;
        state.loading = false;
      })
      .addCase(fetchCoinChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurred";
      });
  },
});

export default coinChartSlice.reducer;
