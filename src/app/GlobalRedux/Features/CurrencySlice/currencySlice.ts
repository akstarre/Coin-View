`use client`;

import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    currency: "usd",
    loading: false,
    error: "",
}

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
            changeCurrency (state, action) {
                state.currency = action.payload
            }
    }
})

export const {changeCurrency} = currencySlice.actions
export default currencySlice.reducer
