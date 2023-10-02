"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { fetchGlobal } from "@/app/GlobalRedux/Features/GlobalSlice";
import tw from "tailwind-styled-components";
import { HorizontalBar } from "../HorizontalBar/index";
import { BtcLogo, EthLogo } from "../../../public/svg";
import { formatNumber } from "@/utils/formatting";
import { getPercentage } from "@/utils/conversions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faBalanceScale,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

type NavbarCoinInfoProps = {
  currency: string;
};

const NavBarCoinInfoContainer = tw.div`
  h-[50px]
  w-[100vw]
  p-0
  m-0
  flex
  justify-center 
  space-x-4
  border-b
  border-[#353048]
  bg-l-dark-purple-background
  text-white
  dark:bg-d-dark-purple
`;

const CoinInfo = tw.div`
  flex
  justify-center
  space-x-4
  w-40
  h-full
  items-center
  text-xs
`;

const MarketInfo = tw.div`
flex
justify-center
space-x-4
w-32
h-full
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

const LogoContainer = tw.div`
  flex
  items-center
  p-2
`;

const BtcLogoDiv = tw(BtcLogo)`
  h-4 
  w-4
`;

const EthLogoDiv = tw(EthLogo)`
  h-4 
  w-4
`;

export const NavbarCoinInfo: React.FC<NavbarCoinInfoProps> = ({ currency }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: global } = useSelector((state: RootState) => state.globalData);

  useEffect(() => {
    dispatch(fetchGlobal());
  }, []);

  if (!global) {
    return <div>Loading..</div>;
  }

  const BitMCP = Math.ceil(global?.market_cap_percentage["btc"]);
  const EthMCP = Math.ceil(global?.market_cap_percentage["eth"]);

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
        <Caret icon={faCaretDown} /> $
        {formatNumber(global?.total_volume[currency] || 0)}
      </CoinInfo>
      <MarketInfo>
        <span>${formatNumber(global?.total_market_cap[currency] || 0)}</span>
        <HorizontalBar
          percentage={getPercentage(
            global?.total_volume[currency],
            global?.total_market_cap[currency]
          )}
        />
      </MarketInfo>
      <CoinInfo>
        <LogoContainer>
          <BtcLogoDiv />
        </LogoContainer>
        {global?.market_cap_percentage.btc.toFixed(2)}%
        <HorizontalBar percentage={BitMCP} />
      </CoinInfo>
      <CoinInfo>
        <LogoContainer>
          <EthLogoDiv />
        </LogoContainer>
        {global?.market_cap_percentage.eth.toFixed(2)}%
        <HorizontalBar percentage={EthMCP} />
      </CoinInfo>
    </NavBarCoinInfoContainer>
  );
};
