"use client";

import React, { ReactElement } from 'react';


export const MarketListItem = ({ coin }): ReactElement => {
    return (
      <div className="flex flex-row items-center justify-between">
        <div className="listNumber p-2">1</div>
        <div className="name p-2">{coin.id}</div>
        <div className="price p-2">{coin.current_price}</div>
        <div className="1hrPriceChange p-2">{coin.price_change_percentage_1h_in_currency}</div>
        <div className="24hrPriceChange p-2">{coin.price_change_percentage_24h_in_currency}</div>
        <div className="7dPriceChange p-2">{coin.price_change_percentage_7d_in_currency}</div>
        <div className="24hrVolume p-2"></div>
        <div className="TotalSupply p-2">{coin.total_supply}</div>
        <div className="7dSparkline p-2"></div>
      </div>
    );
  };