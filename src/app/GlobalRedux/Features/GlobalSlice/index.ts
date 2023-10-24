`use client`;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "@/utils/conversions";

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
export interface CoinListData {
  id: string;
  symbol: string;
  name: string;
}

interface GlobalState {
  data: GlobalData | null;
  coinList: CoinListData[] | null;
  loading: boolean;
  error: string;
}

export const fetchGlobal = createAsyncThunk(
  "global/getData",
  async (thunkApi) => {
    try {
      const GLOBAL_URL = `https://api.coingecko.com/api/v3/global`;
      const COINLIST_URL = "https://api.coingecko.com/api/v3/coins/list";
      const globalResponse = await fetch(GLOBAL_URL);
      const globalData = await globalResponse.json();
      const coinListResponse = await fetch(COINLIST_URL);
      const coinListData = await coinListResponse.json();
      return { globalData, coinListData };
    } catch (err) {
      throw new Error("Error Fetching Global Data");
    }
  }
);

const initialState: GlobalState = {
  data: null,
  coinList: null,
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
        const { globalData, coinListData } = action.payload;
        state.data = globalData.data;
        state.coinList = coinListData;
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
