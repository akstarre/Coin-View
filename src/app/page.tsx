"use client"

import { Navbar } from "@/components/Navbar";
import { LineChart } from "@/components/LineChart"
import  MarketTable  from "../components/MarketTable/index"
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoins } from "@/app/GlobalRedux/Features/MarketTable/marketTableSlice"
import { AppDispatch, RootState } from '@/app/GlobalRedux/store';
import  {useAppSelector} from "./GlobalRedux/store"


const Home = () => {

  const dispatch = useDispatch<AppDispatch>();
  const {currency: currentCurrency} = useAppSelector((state) => state.currency)
  const {coins, loading, error} = useSelector((state: RootState) => state.marketTable);
 

  useEffect(() => {
    dispatch(fetchCoins(currentCurrency));
  }, [currentCurrency, dispatch])


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


      <div><MarketTable coins={coins} loading={loading} error={error} /></div>
    </div>
  );
};

export default Home;
