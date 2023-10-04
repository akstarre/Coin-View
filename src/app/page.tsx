"use client";

import { Navbar } from "@/components/Navbar";
import { Chart } from "@/components/Chart";
import MarketTable from "../components/MarketTable/index";
import { CoinSelectorCarousel } from "../components/CoinSelectorCarousel/index";
import { CoinPortfolioSwitch } from "@/components/CoinPortfolioSwitch";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "@/app/GlobalRedux/Features/MarketTable";
import { changeChart } from "@/app/GlobalRedux/Features/CurrencySlice";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { useAppSelector } from "./GlobalRedux/store";
import tw from "tailwind-styled-components";
import { CoinsData } from "./FakeData/CoinsData";
import { GlobalData } from "./FakeData/GlobalData";

const PageContainer = tw.div`
  bg-l-light-grey-background
  dark:bg-d-black-purple
  `;

const Home = () => {
  // THIS IS FOR MAKING REQUESTS TO API, COMMENTING OUT TO HOOK UP FAKE DATA
  // const dispatch = useDispatch<AppDispatch>();
  // const { currency: currentCurrency, currentChart } = useAppSelector(
  //   (state) => state.currency
  // );
  // const { coins, loading, error } = useSelector(
  //   (state: RootState) => state.marketTable
  // );

  // useEffect(() => {
  //   dispatch(fetchCoins(currentCurrency));
  // }, [currentCurrency, dispatch]);

  const handleChartSelection = (selection: string) => {
    // THIS IS FOR MAKING REQUESTS TO API, COMMENTING OUT TO HOOK UP FAKE DATA
    // dispatch(changeChart(selection));
  };

  let currentChart = "bitcoin";
  let currentCurrency = "usd";
  let loading = false;
  let error = "";
  const coins = CoinsData;

  return (

    <PageContainer>
      <Navbar currency={currentCurrency} />

      <div className="flex w-full justify-around items-center p-4">
        <div>
          <CoinSelectorCarousel
            coins={coins}
            currentChart={currentChart}
            currentCurrency={currentCurrency}
            handleChartSelection={handleChartSelection}
          />
        </div>
        <div className="relative w-[calc(50%-16px)]"></div>
        <div className="relative w-[calc(50%-16px)]"></div>
      </div>

      <div>
        <MarketTable coins={coins} loading={loading} error={error} />
      </div>
    </PageContainer>
  );
};

export default Home;
