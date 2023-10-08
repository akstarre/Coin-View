"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import tw from "tailwind-styled-components";
import { formatNumber } from "@/utils/formatting";
import { getCaretAndColor } from "@/utils/formatting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { transformSparklineToChartFormat } from "@/utils/conversions";
import { HorizontalBar } from "../HorizontalBar";
import { SparklineChart, CoinDataProps } from "../SparklineChart";
import { getPercentage } from "@/utils/conversions";
import { Coin } from "../../../interfaces";

type PercentChangeProp = {
  increase: boolean;
};

const TableRowContainer = tw.div`
  flex
  items-center
  bg-white
  
  my-2
  dark:bg-d-grey-purple-1
  rounded-[10px]
`;

export const NumberCell = tw.div`
  w-4
  py-3
  px-6
  text-center
  overflow-hidden
  opacity-7
`;

export const NameCell = tw.div`
  flex
  items-center
  justify-start
  w-44
  py-3
  px-4
  overflow-wrap
  font-medium
`;

export const PriceCell = tw.div`
  w-32
  py-3
  px-4
  text-center
  font-medium
`;

export const PercentChangeCell = tw.div<PercentChangeProp>`
  w-28
  text-center
  py-3
  px-4
  ${(props) => (props.increase ? "text-green-change" : "text-red-change")}
`;

export const HorizontalBarCell = tw.div`
  w-60
  text-center
  py-3
  px-4
`;

export const SparklineCell = tw.div`
  flex
  justify-center
  items-center
  w-36
  h-20
`;

const StyledIcon = tw(FontAwesomeIcon)`
px-2
`;

type MarketListItemProps = {
  coin: Coin;
  index: number;
};

export const MarketListItem = ({ coin, index }: MarketListItemProps) => {
  const oneHourObject = getCaretAndColor(
    coin.price_change_percentage_1h_in_currency
  );
  const twoFourHourObject = getCaretAndColor(
    coin.price_change_percentage_24h_in_currency
  );
  const sevenDayObject = getCaretAndColor(
    coin.price_change_percentage_7d_in_currency
  );
  const sparklineData: CoinDataProps = {
    prices: transformSparklineToChartFormat(
      coin.sparkline_in_7d.price,
      coin.last_updated
    ),
  };

  return (
    <TableRowContainer>
      <NumberCell>{index + 1}</NumberCell>
      <NameCell>
        <Image
          src={coin.image}
          width={30}
          height={30}
          alt={`${coin.name}'s logo`}
          className="pr-2"
        />
        {coin.name} ({coin.symbol})
      </NameCell>
      <PriceCell>{coin.current_price.toFixed(2)}</PriceCell>
      <PercentChangeCell increase={oneHourObject.increase}>
        <StyledIcon icon={oneHourObject.caret} />
        {formatNumber(coin.price_change_percentage_1h_in_currency)}
      </PercentChangeCell>
      <PercentChangeCell increase={twoFourHourObject.increase}>
        <StyledIcon icon={twoFourHourObject.caret} />
        {formatNumber(coin.price_change_percentage_24h_in_currency)}
      </PercentChangeCell>
      <PercentChangeCell increase={sevenDayObject.increase}>
        <StyledIcon icon={sevenDayObject.caret} />
        {formatNumber(coin.price_change_percentage_7d_in_currency)}
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
      <SparklineCell>
        <SparklineChart
          coinData={sparklineData}
          increase={oneHourObject.increase}
        />
      </SparklineCell>
    </TableRowContainer>
  );
};
