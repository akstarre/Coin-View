import { useState } from "react";
import tw from "tailwind-styled-components";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { useAppSelector } from "@/app/GlobalRedux/store";

import {
  formatDate,
  formatChartNumber,
  getCurrencySymbol,
} from "@/utils/formatting";
import { ChartInfo } from "../ChartInfo";

import { ChartSelector } from "@/components/ChartSelector";
import { changeChart } from "@/app/GlobalRedux/Features/CurrencySlice";
import { CoinSelectorCarousel } from "../CoinSelectorCarousel";
import { ModularChart } from "../ModularChart";
import { CoinDataProps } from "../ModularChart";
import { Coin } from "../../../interfaces";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CoinChartsProps = {
  coinPriceData: CoinDataProps;
  coinVolumeData: CoinDataProps;
  currentCoin: Coin;
  currentCurrency: string;
};


const ComponentContainer = tw.div`
  flex
  flex-col
  justify-center
  items-center
  w-full
  h-[45vh]
  my-44
`;

const ChartsContainer = tw.div`
  flex
  justify-center
  align-center
  w-[75vw]
`;


type CoinChartsProps = {
  coins: Coin[];
  coinPriceData: CoinDataProps;
  coinVolumeData: CoinDataProps;

const SingleChartContainer = tw.div`
  relative
  h-full
  w-1/2
  m-1
`;

const ChartInfoDiv = tw.div`
  absolute
  flex
  flex-col
  justify-evenly
  z-99
  top-8 
  left-12
  p-2 
  
`;

const ChartName = tw.span`
  text-[2rem]
  dark:text-white
  dark:text-opacity-50
  pb-4
`;

const ChartMarketInfo = tw.span`
  text-[2.5rem]  
`;

const ChartDate = tw.div`
  text-[2rem]
  dark:text-white
  dark:text-opacity-50
`;


export const CoinCharts: React.FC<CoinChartsProps> = ({
  coins,
  coinPriceData,
  coinVolumeData,
  currentCoin,
  currentCurrency,

}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currency: currentCurrency, currentChart } = useAppSelector(
    (state) => state.currency
  );

  const handleCoinChartSelection = (selection: string) => {
    dispatch(changeChart(selection));
  };

  return (
    <ComponentContainer>
      <CoinSelectorCarousel
        coins={coins}
        currentChart={currentChart}
        currentCurrency={currentCurrency}
        handleCoinChartSelection={handleCoinChartSelection}
      />
      <ChartsContainer>

        <SingleChartContainer>
          <ModularChart
            coinData={coinPriceData}
            hasAxis={true}
            isprice={true}
          />
          <ChartInfo
            currentCoin={currentCoin}
            currentCurrency={currentCurrency}
            isprice={true}
          />
        </SingleChartContainer>
        <SingleChartContainer>
          <ModularChart
            coinData={coinVolumeData}
            hasAxis={true}
            isprice={false}
          />
          <ChartInfo
            currentCoin={currentCoin}
            currentCurrency={currentCurrency}
            isprice={false}
          />
        </SingleChartContainer>
      </ChartsContainer>
      <ChartSelector chartSelection={"1D"} />
    </ComponentContainer>
  );
};
