`use client`;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"



export const fetchCoins = createAsyncThunk('coins/getCoins', 
    async (currency:string, thunkApi) => {
    const COIN_URL= `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`
    // const GLOBAL_URL=`https://api.coingecko.com/api/v3/global`
    const response = await fetch(COIN_URL)
    // const globalResponse = await fetch(GLOBAL_URL)
    const data = await response.json();
    // const globalData = await globalResponse.json();
    // const finalData = data.map((coin) => {
    //     return { ...coin, "total_market_cap": globalData.total_market_cap[coin.symbol] };
    //   });
    console.log(data)
    return data
})

const initialState = {
    coins: [],
    loading: false,
    error: "",
}

const marketTableSlice = createSlice({
    name: "coins",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoins.fulfilled, (state, action)=> {
            state.coins = action.payload
        })
    }
})

export default marketTableSlice.reducer