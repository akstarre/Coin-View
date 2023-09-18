"use client";

import React, { ReactElement } from 'react';
import { HorizontalBar } from "../HorizontalBar"


export const MarketListItem = ({ coin, index }) => {
  return (
    <tr>
      <td className="py-2 px-4 border">{index + 1}</td>
      <td className="py-2 px-4 border">{coin.name} ({coin.symbol})</td>
      <td className="py-2 px-4 border">{coin.current_price.toFixed(2)}</td>
      <td className="py-2 px-4 border">{coin.price_change_percentage_1h_in_currency.toFixed(2)}</td>
      <td className="py-2 px-4 border">{coin.price_change_percentage_24h_in_currency.toFixed(2)}</td>
      <td className="py-2 px-4 border">{coin.price_change_percentage_7d_in_currency.toFixed(2)}</td>
      <td className="py-2 px-4 border">
        <HorizontalBar num1={coin.market_cap_change_24h} num2={coin.market_cap} />
      </td>
      <td className="py-2 px-4 border">
        <HorizontalBar num1={coin.circulating_supply} num2={coin.total_supply} />
      </td>
      <td className="py-2 px-4 border">
        {/* Replace this with your Last 7d sparkline chart */}
        Sparkline Placeholder
      </td>
    </tr>
  );
};
