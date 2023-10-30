"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-styled-components";
import {
  AppDispatch,
  RootState,
  useAppSelector,
} from "@/app/GlobalRedux/store";
import { fetchGlobal } from "@/app/GlobalRedux/Features/GlobalSlice";
import { formatNumber, getCaretAndColor } from "@/utils/formatting";
import { getPercentage } from "@/utils/conversions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faBalanceScale,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { HorizontalBar } from "../HorizontalBar";
import { BtcLogo, EthLogo } from "../../../public/svg";
import { GlobalData } from "@/app/FakeData/GlobalData";

type NavbarCoinInfoProps = {};

type FontAwesomeProps = {
  $increase: boolean;
};

const NavBarCoinInfoContainer = tw.div`
  flex
  flex-col md:flex-row
  w-full
  p-0
  m-0
  justify-center
  border-b
  border-[#353048]
  bg-l-dark-purple-background
  text-white
  dark:bg-d-dark-purple
`;

const CoinInfoGroup = tw.div`
  flex
  flex-row
  justify-center
  space-x-4
  items-center
`;

const CoinInfo = tw.div`
  flex
  space-x-4
  w-auto md:w-40
  items-center
  text-xs
`;

const MarketInfo = tw.div`
  flex
  justify-between
  space-x-2
  w-full md:w-32
  items-center
  text-xs
  overflow-hidden
  px-32 sm:px-16 md:px-8 lg:px-0
`;

const HorizontalBarContainer = tw.div`
  flex-grow
  p-1
  w-0 min-w-4
`;

const PriceText = tw.span`
  whitespace-nowrap
  overflow-ellipsis
  overflow-hidden
  max-w-[70%]
`;

const Icon = tw(FontAwesomeIcon)`
  p-2
  text-white
`;

const Caret = tw(FontAwesomeIcon)<FontAwesomeProps>`
  p-2
  ${(props) => (props.$increase ? "text-green-change" : "text-red-change")}
`;

const LogoContainer = tw.div`
  h-[50px]
  w-[50px]
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

export const NavbarCoinInfo: React.FC<NavbarCoinInfoProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { currency } = useAppSelector((state) => state.currency);
  // const { data: global } = useSelector((state: RootState) => state.globalData);
  const global = GlobalData.data;

  useEffect(() => {
    dispatch(fetchGlobal());
  }, []);

  if (!global) {
    return <div>Loading..</div>;
  }

  const BtcMCP = Math.ceil(global?.market_cap_percentage["btc"]);
  const EthMCP = Math.ceil(global?.market_cap_percentage["eth"]);
  const usdChangeObject = getCaretAndColor(
    global?.market_cap_change_percentage_24h_usd
  );

  return (
    <NavBarCoinInfoContainer>
      <CoinInfoGroup>
        <CoinInfo>
          <Icon icon={faCoins} />
          Coins: {global?.active_cryptocurrencies}
        </CoinInfo>
        <CoinInfo>
          <Icon icon={faBalanceScale} />
          Exchange: {global?.markets}
        </CoinInfo>
        <CoinInfo>
          <Caret
            icon={usdChangeObject.caret}
            $increase={usdChangeObject.increase}
          />{" "}
          ${formatNumber(global?.total_volume[currency] || 0)}
        </CoinInfo>
      </CoinInfoGroup>
      <CoinInfoGroup>
        <MarketInfo>
          <PriceText>
            ${formatNumber(global?.total_market_cap[currency] || 0)}
          </PriceText>
          <HorizontalBarContainer>
            <HorizontalBar
              percentage={getPercentage(
                global?.total_volume[currency],
                global?.total_market_cap[currency]
              )}
              fillColor="white"
              backgroundColor="#797585"
            />
          </HorizontalBarContainer>
        </MarketInfo>
      </CoinInfoGroup>
      <CoinInfoGroup>
        <CoinInfo>
          <LogoContainer>
            <BtcLogoDiv />
          </LogoContainer>
          {global?.market_cap_percentage.btc.toFixed(2)}%
          {global && (
            <HorizontalBarContainer>
              <HorizontalBar
                percentage={BtcMCP}
                fillColor="#CE7200"
                backgroundColor="#797585"
              />
            </HorizontalBarContainer>
          )}
        </CoinInfo>
        <CoinInfo>
          <LogoContainer>
            <EthLogoDiv />
          </LogoContainer>
          {global?.market_cap_percentage.eth.toFixed(2)}%
          {global && (
            <HorizontalBarContainer>
              <HorizontalBar
                percentage={EthMCP}
                fillColor="#5F75C9"
                backgroundColor="#797585"
              />
            </HorizontalBarContainer>
          )}
        </CoinInfo>
      </CoinInfoGroup>
    </NavBarCoinInfoContainer>
  );
};
