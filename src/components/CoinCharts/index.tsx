import { useState } from "react";
import tw from "tailwind-styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { useAppSelector } from "@/app/GlobalRedux/store";
import { ChartSelector } from "@/components/ChartSelector";
import { changeChart } from "@/app/GlobalRedux/Features/CurrencySlice";
import { CoinSelectorCarousel } from "../CoinSelectorCarousel";
import { ModularChart } from "../ModularChart";
import { CoinDataProps } from "../ModularChart";
import { Coin } from "../../../interfaces";

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
};

export const CoinCharts: React.FC<CoinChartsProps> = ({
  coins,
  coinPriceData,
  coinVolumeData,
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
        <ModularChart coinData={coinPriceData} hasAxis={true} isprice={true} />
        <ModularChart
          coinData={coinVolumeData}
          hasAxis={true}
          isprice={false}
        />
      </ChartsContainer>
      <ChartSelector chartSelection={"1D"} />
    </ComponentContainer>
  );
};
