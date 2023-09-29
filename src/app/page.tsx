"use client";

import { Navbar } from "@/components/Navbar";
import { Chart } from "@/components/Chart";
import MarketTable from "../components/MarketTable/index";
import { ChartSelector } from "../components/ChartSelector/index";
import { CoinPortfolioSwitch } from "@/components/CoinPortfolioSwitch";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "@/app/GlobalRedux/Features/MarketTable";
import { changeChart } from "@/app/GlobalRedux/Features/CurrencySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { useAppSelector } from "./GlobalRedux/store";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currency: currentCurrency, currentChart } = useAppSelector(
    (state) => state.currency
  );
  const { coins, loading, error } = useSelector(
    (state: RootState) => state.marketTable
  );

  useEffect(() => {
    dispatch(fetchCoins(currentCurrency));
  }, [currentCurrency, dispatch]);

  const handleChartSelection = (selection: string) => {
    dispatch(changeChart(selection));
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex w-full justify-around items-center p-4">
        <div>
          <ChartSelector
            coins={coins}
            currentChart={currentChart}
            currentCurrency={currentCurrency}
            handleChartSelection={handleChartSelection}
          />
        </div>
        <div className="relative w-[calc(50%-16px)]">
          {/* <Chart chartType="line" currentChart={currentChart}/> */}
        </div>
        <div className="relative w-[calc(50%-16px)]">
          {/* <Chart chartType="bar" currentChart={currentChart}/> */}
        </div>
      </div>

      <div>
        <MarketTable coins={coins} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Home;
