`use client`;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "@/utils/conversions";

export const fetchCoins = createAsyncThunk(
  "coins/getCoins",
  async (currency: string, thunkApi) => {
    const COIN_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
    console.log("Market Table fetch requested");
    return fetchData(COIN_URL);
  }
);

const initialState = {
  coins: [],
  loading: false,
  error: "",
};

const marketTableSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unkown error occurred";
      });
  },
});

export default marketTableSlice.reducer;
