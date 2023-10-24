"use client";

import React, { ReactElement } from "react";
import Image from "next/image";
import tw from "tailwind-styled-components";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { formatNumber, getCurrencySymbol } from "@/utils/formatting";
import { getCaretAndColor } from "@/utils/formatting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { transformSparklineToChartFormat } from "@/utils/conversions";
import { RootState } from "@/app/GlobalRedux/store";
import { getPercentage } from "@/utils/conversions";
import { HorizontalBar } from "../HorizontalBar";
import { SparklineChart, CoinDataProps } from "../SparklineChart";
import { Coin } from "../../../interfaces";

type MarketListItemProps = {
  coin: Coin;
  index: number;
};

type ThemeColors = {
  [key: string]: {
    fill: {
      increase: string;
      decrease: string;
    };
    background: {
      increase: string;
      decrease: string;
    };
  };
};

const TableRowContainer = tw.div`
  flex
  justify-evenly
  items-center
  bg-white
  mx-8
  my-2
  w-full
  dark:bg-d-grey-purple-1
  rounded-[10px]
`;

export const NumberCell = tw.div`
  w-8
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
  w-52
  py-3
  px-4
  overflow-wrap
  font-medium
`;

export const PriceCell = tw.div`
  w-36
  py-3
  px-4
  text-center
  font-medium
`;

export const PercentChangeCell = tw.div`
  w-28
  text-center
  py-3
  px-4
  
`;

export const HorizontalBarCell = tw.div`
  w-64
  text-center
  py-3
  px-4
`;

export const SparklineCell = tw.div`
  flex
  justify-center
  items-center
  w-44
  h-20
`;

const StyledIcon = tw(FontAwesomeIcon)`
px-2
`;

const colors: ThemeColors = {
  dark: {
    fill: {
      increase: "#01F1E3",
      decrease: "#FE2264",
    },
    background: {
      increase: "#3D7A76",
      decrease: "#804058",
    },
  },
  light: {
    fill: {
      increase: "#02B1A7",
      decrease: "#FE2263",
    },
    background: {
      increase: "#AFE5E5",
      decrease: "#FBBAD1",
    },
  },
};

export const MarketListItem = ({ coin, index }: MarketListItemProps) => {
  const { theme, setTheme } = useTheme();
  const { currency } = useSelector((state: RootState) => state.currency);

  const getTableColor = (isFill: boolean, increase: boolean) => {
    const fillOrBackground = isFill ? "fill" : "background";
    const increaseOrDecrease = increase ? "increase" : "decrease";

    if (!theme || !colors[theme]) {
      return colors["dark"][fillOrBackground][increaseOrDecrease];
    }
    return colors[theme][fillOrBackground][increaseOrDecrease];
  };

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
      <PriceCell>
        {formatNumber(coin.current_price)}{" "}
        <FontAwesomeIcon icon={getCurrencySymbol(currency)} />
      </PriceCell>
      {/* Switched PercentageChangeCell to inline style for more dynamic table styling */}
      <PercentChangeCell
        style={{ color: `${getTableColor(true, oneHourObject.increase)}` }}
      >
        <StyledIcon icon={oneHourObject.caret} />
        {formatNumber(coin.price_change_percentage_1h_in_currency)}
      </PercentChangeCell>
      <PercentChangeCell
        style={{ color: `${getTableColor(true, twoFourHourObject.increase)}` }}
      >
        <StyledIcon icon={twoFourHourObject.caret} />
        {formatNumber(coin.price_change_percentage_24h_in_currency)}
      </PercentChangeCell>
      <PercentChangeCell
        style={{ color: `${getTableColor(true, sevenDayObject.increase)}` }}
      >
        <StyledIcon icon={sevenDayObject.caret} />
        {formatNumber(coin.price_change_percentage_7d_in_currency)}
      </PercentChangeCell>
      <HorizontalBarCell>
        <HorizontalBar
          percentage={getPercentage(coin.total_volume, coin.market_cap)}
          fillColor={getTableColor(true, twoFourHourObject.increase)}
          backgroundColor={getTableColor(false, twoFourHourObject.increase)}
        />
      </HorizontalBarCell>
      <HorizontalBarCell>
        <HorizontalBar
          percentage={getPercentage(coin.circulating_supply, coin.total_supply)}
          fillColor={getTableColor(true, twoFourHourObject.increase)}
          backgroundColor={getTableColor(false, twoFourHourObject.increase)}
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
