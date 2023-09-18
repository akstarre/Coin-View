`use client`;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGlobal = createAsyncThunk(
  "global/getData",
  async (thunkApi) => {
    const GLOBAL_URL = `https://api.coingecko.com/api/v3/global`;
    const response = await fetch(GLOBAL_URL);
    const data = await response.json();
    console.log(data);
    return data;
  }
);

const initialState = {
  globalData: [],
  loading: false,
  error: "",
};

const globalSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGlobal.fulfilled, (state, action) => {
      state.globalData = action.payload;
    });
  },
});

export default globalSlice.reducer;
