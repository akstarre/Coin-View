"use client"

import { Navbar } from "@/components/Navbar";
import { LineChart } from "@/components/LineChart"
import  MarketTable  from "../components/MarketTable/index"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoins } from "@/app/GlobalRedux/Features/MarketTable/marketTableSlice"
import { MarketTable } from '../components/MarketTable/index'; 
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';

const Home = () => {

  const dispatch = useDispatch<AppDispatch>();
  const coinState = useSelector((state: RootState) => state.coins);
  const { loading, coins, error } = coinState;

  useEffect(() => {
    dispatch(fetchCoins());
  }, [])


  return (
    <div className="">
      <Navbar />
      <div className="flex w-full justify-around items-center p-4">
        <div className="relative w-[calc(50%-16px)]">
          <LineChart />
        </div>
        <div className="relative w-[calc(50%-16px)]">
          <LineChart />
        </div>
      </div>


      <div><MarketTable coins={coins} /></div>
    </div>
  );
};

export default Home;
