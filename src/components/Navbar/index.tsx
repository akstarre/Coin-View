"use client";

import { Dropdown } from "../Dropdown";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency } from "@/app/GlobalRedux/Features/CurrencySlice/currencySlice";
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';

export const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { currency } = useSelector((state: RootState) => state.currency);

    const handleSelection = (selection: string) => {
        dispatch(changeCurrency(selection));
    }

    return (
        <div className="flex justify-between">
            <div className="flex flex-row justify-between" style={{ flexBasis: '16%' }}>
                <div><button>Coins</button></div>
                <div><button>Portfolio</button></div>
            </div>
            <div className="flex flex-row justify-between" style={{ flexBasis: '33%' }}>
                <div><input placeholder="Search"></input></div>
                <div><Dropdown handleSelection={handleSelection} currentCurrency={currency} /></div>
                <button>DarkMode</button>
            </div>
        </div>
    );
};
