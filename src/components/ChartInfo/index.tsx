import tw from "tailwind-styled-components";
import {
  formatDate,
  formatChartNumber,
  getCurrencySymbol,
} from "@/utils/formatting";
import { Coin } from "../../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { current } from "@reduxjs/toolkit";

type ChartInfoProps = {
  currentCoin: Coin;
  currentCurrency: string;
  isprice: boolean;
};

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
  text-[1.5rem]
  dark:text-white
  dark:text-opacity-50
  pb-4
`;

const ChartMarketInfo = tw.span`
  text-[2rem]
  font-bold  
`;

const ChartDate = tw.div`
  text-[1.5rem]
  text-l-dark-purple-background
  dark:text-white
  dark:text-opacity-50
`;

export const ChartInfo: React.FC<ChartInfoProps> = ({
  currentCurrency,
  currentCoin,
  isprice,
}) => {
  const todaysDate = new Date();
  return (
    <ChartInfoDiv>
      <ChartName>
        {isprice
          ? `${currentCoin?.name} (${currentCoin?.symbol})`
          : "Volume 24H"}
      </ChartName>
      <ChartMarketInfo>
        <FontAwesomeIcon icon={getCurrencySymbol(currentCurrency)} />
        {isprice && currentCoin?.market_cap
          ? formatChartNumber(currentCoin?.market_cap)
          : formatChartNumber(currentCoin?.market_cap_change_24h)}
      </ChartMarketInfo>
      <ChartDate>{formatDate(todaysDate)}</ChartDate>
    </ChartInfoDiv>
  );
};
