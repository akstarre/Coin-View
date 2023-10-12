`use client`;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MarketCap {
  [key: string]: number;
}

interface TotalVolume {
  [key: string]: number;
}

interface MarketCapPercentage {
  [key: string]: number;
}

interface GlobalData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: MarketCap;
  total_volume: TotalVolume;
  market_cap_percentage: MarketCapPercentage;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

interface GlobalState {
  data: GlobalData | null;
  loading: boolean;
  error: string;
}

export const fetchGlobal = createAsyncThunk(
  "global/getData",
  async (thunkApi) => {
    const GLOBAL_URL = `https://api.coingecko.com/api/v3/global`;
    const response = await fetch(GLOBAL_URL);
    const data = await response.json();
    return data;
  }
);

const initialState: GlobalState = {
  data: null,
  loading: false,
  error: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobal.fulfilled, (state, action) => {
        state.data = action.payload.data;
      })
      .addCase(fetchGlobal.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchGlobal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch global data";
      });
  },
});

export default globalSlice.reducer;

export interface RootState {
  globalData: {
    data: GlobalData | null;
    loading: boolean;
    error: string;
  };
}
