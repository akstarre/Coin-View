"use client";

import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { useAppSelector } from "@/app/GlobalRedux/store";
import { Navbar } from "@/components/Navbar";
import { CoinCharts } from "@/components/CoinCharts";
import { fetchCoins } from "@/app/GlobalRedux/Features/MarketTableSlice";
import { BitcoinDailyData } from "@/app/FakeData/BitcoinDailyData";
import { NavbarCoinInfo } from "@/components/NavbarCoinInfo";
import MarketTable from "../components/MarketTable/index";
import { CoinSelectorCarousel } from "../components/CoinSelectorCarousel/index";
import { CoinsData } from "./FakeData/CoinsData";
import { GlobalData } from "./FakeData/GlobalData";

const PageContainer = tw.div`
  bg-l-light-grey-background
  dark:bg-d-black-purple
  `;

const PageInnerContainer = tw.div`
  
`;

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

  const coinPriceData = BitcoinDailyData.prices;
  const coinVolumeData = BitcoinDailyData.total_volumes;

  return (
    <PageContainer>
      <NavbarCoinInfo currency={currentCurrency} />
      <Navbar />

      <div className="w-full justify-around items-center p-4">
        <CoinCharts
          coins={coins}
          coinPriceData={{ prices: coinPriceData as [number, number][] }}
          coinVolumeData={{ prices: coinVolumeData as [number, number][] }}
        />
      </div>

      <div>
        <MarketTable coins={coins} loading={loading} error={error} />
      </div>
    </PageContainer>
  );
};

export default Home;
