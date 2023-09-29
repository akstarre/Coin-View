"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { fetchGlobal } from "@/app/GlobalRedux/Features/GlobalSlice";
import { HorizontalBar } from "../HorizontalBar";
import { BtcLogo, EthLogo } from "../../../public/svg";
import { formatNumber } from "../../utils/conversion";
import {
  faCoins,
  faBalanceScale,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  NavBarCoinInfoContainer,
  CoinInfo,
  Icon,
  Caret,
  LogoContainer,
} from "../../styles/NavbarCoinInfoStyles/index";

type NavbarCoinInfoProps = {
  currency: string;
};

export const NavbarCoinInfo: React.FC<NavbarCoinInfoProps> = ({ currency }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: global } = useSelector((state: RootState) => state.globalData);

  useEffect(() => {
    dispatch(fetchGlobal());
  }, []);

  if (!global) {
    return <div>Loading..</div>;
  }

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
      <CoinInfo>
        ${formatNumber(global?.total_market_cap[currency] || 0)}
        <HorizontalBar
          num1={global?.total_volume[currency]}
          num2={global?.total_market_cap[currency]}
        />
      </CoinInfo>
      <CoinInfo>
        <LogoContainer>
          <BtcLogo className="h-4 w-4" />
        </LogoContainer>
        {global?.market_cap_percentage.btc.toFixed(2)}%
        <HorizontalBar num1={global?.market_cap_percentage["btc"]} num2={100} />
      </CoinInfo>
      <CoinInfo>
        <LogoContainer>
          <EthLogo className="h-4 w-4" />
        </LogoContainer>
        {global?.market_cap_percentage.eth.toFixed(2)}%
        <HorizontalBar num1={global?.market_cap_percentage["eth"]} num2={100} />
      </CoinInfo>
    </NavBarCoinInfoContainer>
  );
};
