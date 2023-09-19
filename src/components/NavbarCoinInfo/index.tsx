"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { fetchGlobal } from "@/app/GlobalRedux/Features/GlobalSlice";
import tw from "tailwind-styled-components";
import { HorizontalBar } from "../HorizontalBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faBalanceScale,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

const NavBarCoinInfoContainer = tw.div`
h-[50px]
w-[100vw]
p-0
m-0
bg-dark-purple
flex
justify-center
space-x-4
`;

const CoinInfo = tw.div`
flex
justify-center
space-x-4
min-w-[100px]
max-w-[200px]
items-center
text-xs
`;

const Icon = tw(FontAwesomeIcon)`
p-2
text-white
`;

const Caret = tw(FontAwesomeIcon)`
p-2
text-green-change
`;

export const NavbarCoinInfo = ({ currency }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { globalData } = useSelector((state: RootState) => state.globalData);
  const { data: global } = globalData;
  useEffect(() => {
    dispatch(fetchGlobal());
  }, []);

  console.log(global);
  const getVolumeOverMarket = () => {
    const quotient = global.total_volume[currency] / global.total_market_cap;
  };

  const formatNumber = (num: number) => {
    if (num > 1000000000000) {
      const finalNum = (num / 1000000000000).toFixed(2);
      return `${finalNum}T`;
    }
    if (num > 1000000) {
      const finalNum = (num / 1000000000).toFixed(2);
      return `${finalNum}B`;
    }
    if (num > 1000000) {
      const finalNum = (num / 1000000).toFixed(2);
      return `${finalNum}M`;
    }
  };

  return (
    <NavBarCoinInfoContainer>
      <CoinInfo>
        <Icon icon={faCoins} />
        Coins: {global?.active_cryptocurrencies}
      </CoinInfo>
      <CoinInfo>
        <Icon icon={faBalanceScale} />
        Exchange: {global?.markets}
      </CoinInfo>
      <CoinInfo>
        <Caret icon={faCaretDown} />
        {formatNumber(global?.total_volume[currency])}
      </CoinInfo>
      <CoinInfo>
        ${formatNumber(global?.total_market_cap[currency])}
        <HorizontalBar
          num1={global?.total_volume[currency]}
          num2={global?.total_market_cap[currency]}
        />
      </CoinInfo>
      <CoinInfo>
        <svg></svg>
        {global?.market_cap_percentage["btc"].toFixed(2)}%
        <HorizontalBar num1={global?.market_cap_percentage["btc"]} num2={100} />
      </CoinInfo>
      <CoinInfo>
        {global?.market_cap_percentage["eth"].toFixed(2)}%
        <HorizontalBar num1={global?.market_cap_percentage["eth"]} num2={100} />
      </CoinInfo>
    </NavBarCoinInfoContainer>
  );
};
