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
import { fetchCoinChart } from "@/app/GlobalRedux/Features/CoinChartSlice";
import { ChartSelector } from "@/components/ChartSelector";
import CurrencySlice, {
  changeChart,
} from "@/app/GlobalRedux/Features/CurrencySlice";
import { ChartInfo } from "../ChartInfo";
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
  coinPriceData,
  coinVolumeData,
  currentCoin,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currency, currentChart } = useAppSelector((state) => state.currency);

  const { coins, loading, error } = useSelector(
    (state: RootState) => state.marketTable
  );

  const { charts } = useSelector((state: RootState) => state.coinChart);

  const timePeriod = "1D";

  const handleCoinChartSelection = (selections: string[]) => {
    selections.forEach((selection) => {
      if (!charts[selection][timePeriod]) {
        dispatch(fetchCoinChart({ coinId: selection, currency, timePeriod }));
      }
    });
  };

  return (
    <ComponentContainer>
      <CoinSelectorCarousel
        coins={coins}
        currentChart={currentChart}
        currentCurrency={currency}
        handleCoinChartSelection={handleCoinChartSelection}
      />
      <ChartsContainer>
        <SingleChartContainer>
          <ModularChart
            coinData={coinPriceData}
            hasAxis={true}
            isPrice={true}
          />
          {currentCoin && (
            <ChartInfo
              currentCoin={currentCoin}
              currentCurrency={currency}
              isprice={true}
            />
          )}
        </SingleChartContainer>
        <SingleChartContainer>
          <ModularChart
            coinData={coinVolumeData}
            hasAxis={true}
            isPrice={false}
          />
          {currentCoin && (
            <ChartInfo
              currentCoin={currentCoin}
              currentCurrency={currency}
              isprice={false}
            />
          )}
        </SingleChartContainer>
      </ChartsContainer>
      <ChartSelector chartSelection={"1D"} />
    </ComponentContainer>
  );
};
