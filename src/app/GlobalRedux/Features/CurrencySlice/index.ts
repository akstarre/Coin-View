`use client`;

import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    currency: "usd",
    currentChart: "bitcoin",
    loading: false,
    error: "",
}

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
            changeCurrency (state, action) {
                state.currency = action.payload
            },
            changeChart (state, action) {
                state.currentChart = action.payload
            }
    }
})

export const {changeCurrency, changeChart} = currencySlice.actions
export default currencySlice.reducer
