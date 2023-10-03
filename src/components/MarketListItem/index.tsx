"use client";

import React, { ReactElement } from "react";
import { HorizontalBar } from "../HorizontalBar";
import { getPercentage } from "@/utils/conversions";
import { Coin } from "../../../interfaces";
import tw from "tailwind-styled-components";

const TableRowContainer = tw.div`
  flex
  items-center
  bg-white
  mx-8
  my-2
  dark:bg-d-grey-purple-1
  rounded-[10px]
`;

export const NumberCell = tw.div`
  w-4
  py-2 
  px-4
  text-center
  overflow-hidden
  
`;

export const NameCell = tw.div`
  w-40
  py-2 
  px-4
  text-center
  overflow-hidden
`;

export const PriceCell = tw.div`
  w-32
  py-2 
  px-4
  text-center
`;

export const PercentChangeCell = tw.div`
  w-28
  text-center
  py-2 
  px-4
`;

export const HorizontalBarCell = tw.div`
  w-60
  text-center
  py-2 
  px-4
`;

export const SparklineCell = tw.div`
  max-w-40
  text-center
  py-2 
  px-4
`;

type MarketListItemProps = {
  coin: Coin;
  index: number;
};

export const MarketListItem = ({ coin, index }: MarketListItemProps) => {
  return (
    <TableRowContainer>
      <NumberCell>{index + 1}</NumberCell>
      <NameCell>
        {coin.name} ({coin.symbol})
      </NameCell>
      <PriceCell>{coin.current_price.toFixed(2)}</PriceCell>
      <PercentChangeCell>
        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
      </PercentChangeCell>
      <PercentChangeCell>
        {coin.price_change_percentage_24h_in_currency.toFixed(2)}
      </PercentChangeCell>
      <PercentChangeCell>
        {coin.price_change_percentage_7d_in_currency.toFixed(2)}
      </PercentChangeCell>
      <HorizontalBarCell>
        <HorizontalBar
          percentage={getPercentage(
            coin.market_cap_change_24h,
            coin.market_cap
          )}
        />
      </HorizontalBarCell>
      <HorizontalBarCell>
        <HorizontalBar
          percentage={getPercentage(coin.circulating_supply, coin.total_supply)}
        />
      </HorizontalBarCell>
      <SparklineCell>Sparkline Placeholder</SparklineCell>
    </TableRowContainer>
  );
};
