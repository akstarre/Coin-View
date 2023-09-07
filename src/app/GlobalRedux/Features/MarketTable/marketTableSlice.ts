`use client`;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const COIN_URL= "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en"

export const fetchCoins = createAsyncThunk('coins/getCoins', async (thunkApi) => {
    const response = await fetch(COIN_URL)
    const data = await response.json();
    return data
})

const initialState = {
    coins: [],
    loading: false,
    error: "",
}

const marketTableSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoins.fulfilled, (state, action)=> {
            state.coins.push(...action.payload)
        })
    }
})

export default marketTableSlice.reducer