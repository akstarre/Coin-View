"use client";

import React, { ReactElement } from "react";
import { HorizontalBar } from "../HorizontalBar";
import { getPercentage } from "@/utils/conversions";
import { Coin } from "../../../interfaces";

type MarketListItemProps = {
  coin: Coin;
  index: number;
};

type DropdownProps = {
  handleSelection: (currency: string) => void;
  currentCurrency: string;
};

export const MarketListItem = ({ coin, index }: MarketListItemProps) => {
  return (
    <tr>
      <td className="py-2 px-4 border">{index + 1}</td>
      <td className="py-2 px-4 border">
        {coin.name} ({coin.symbol})
      </td>
      <td className="py-2 px-4 border">{coin.current_price.toFixed(2)}</td>
      <td className="py-2 px-4 border">
        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
      </td>
      <td className="py-2 px-4 border">
        {coin.price_change_percentage_24h_in_currency.toFixed(2)}
      </td>
      <td className="py-2 px-4 border">
        {coin.price_change_percentage_7d_in_currency.toFixed(2)}
      </td>
      <td className="py-2 px-4 border">
        <HorizontalBar
          percentage={getPercentage(
            coin.market_cap_change_24h,
            coin.market_cap
          )}
        />
      </td>
      <td className="py-2 px-4 border">
        <HorizontalBar
          percentage={getPercentage(coin.circulating_supply, coin.total_supply)}
        />
      </td>
      <td className="py-2 px-4 border">Sparkline Placeholder</td>
    </tr>
  );
};
