import tw from "tailwind-styled-components";
import {
  formatDate,
  formatChartNumber,
  getCurrencySymbol,
} from "@/utils/formatting";
import { ChartInfo } from "../ChartInfo";
import { ChartSelector } from "@/components/ChartSelector";
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
  h-[30vh]
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
  currentCurrency,

}) => {
  const handleTimeChartSelection = (selection: string) => {
    handleTimeChartSelection(selection);
  };
  return (
    <ComponentContainer>
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
      <ChartSelector
        // handleTimeChartSelection={handleTimeChartSelection}
        chartSelection={"1D"}
      />
    </ComponentContainer>
  );
};
