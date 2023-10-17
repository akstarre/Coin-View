import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/GlobalRedux/store";
import { useAppSelector } from "@/app/GlobalRedux/store";
import {
  fetchCoinChart,
  ChartData,
} from "@/app/GlobalRedux/Features/CoinChartSlice";
import { ChartSelector } from "@/components/ChartSelector";
import { ChartInfo } from "../ChartInfo";
import { CoinSelectorCarousel } from "../CoinSelectorCarousel";
import { ModularChart } from "../ModularChart";
import { CoinDataProps } from "../ModularChart";
import { Coin } from "../../../interfaces";

type CoinChartsProps = {
  coinPriceData: CoinDataProps;
  coinVolumeData: CoinDataProps;
  currentCoin: Coin;
  currentCurrency: string;
};

const EmptyChartData = {
  prices: [[0, 0]],
  market_caps: [[0], [0]],
  total_volumes: [[0], [0]],
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

export const CoinCharts: React.FC<CoinChartsProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentChartData, setCurrentChartData] = useState<ChartData[]>([]);
  const [currentCoin, setCurrentCoin] = useState<Coin>();

  const { currency } = useAppSelector((state) => state.currency);
  const { charts } = useAppSelector((state) => state.coinChart);
  const { currentCharts, currentTimePeriod } = useAppSelector(
    (state) => state.currentCharts
  );
  const { coins } = useAppSelector((state) => state.marketTable) as {
    coins: Coin[];
  };

  useEffect(() => {
    const fetchChartDataForStore = async (chart: string) => {
      await dispatch(
        fetchCoinChart({
          coinId: chart,
          currency,
          timePeriod: currentTimePeriod,
        })
      );
    };
    for (const chart of currentCharts) {
      if (!charts[chart] || !charts[chart][currentTimePeriod]) {
        fetchChartDataForStore(chart);
      }
    }
    const currentChartDataArray = currentCharts.map((chart) => {
      if (charts[chart] && charts[chart][currentTimePeriod]) {
        return charts[chart][currentTimePeriod];
      } else return EmptyChartData;
    });

    if (coins && currentCharts[0]) {
      const currentCoinHolder = coins.find(
        (coin) => coin.id === currentCharts[0]
      );
      setCurrentCoin(currentCoinHolder);
    }

    setCurrentChartData(currentChartDataArray);
  }, [currentCharts, charts, coins, currentTimePeriod]);

  return (
    <ComponentContainer>
      <CoinSelectorCarousel coins={coins} currentCurrency={currency} />
      <ChartsContainer>
        <SingleChartContainer>
          <ModularChart coinData={currentChartData} isLine={true} />
          {currentCoin && (
            <ChartInfo
              currentCoin={currentCoin}
              currentCurrency={currency}
              isprice={true}
            />
          )}
        </SingleChartContainer>
        <SingleChartContainer>
          <ModularChart coinData={currentChartData} isLine={false} />
          {currentCoin && (
            <ChartInfo
              currentCoin={currentCoin}
              currentCurrency={currency}
              isprice={false}
            />
          )}
        </SingleChartContainer>
      </ChartsContainer>
      <ChartSelector />
    </ComponentContainer>
  );
};
