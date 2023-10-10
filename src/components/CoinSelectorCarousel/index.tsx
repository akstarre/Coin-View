"use client";
import React, { useRef } from "react";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { Url } from "next/dist/shared/lib/router/router";
import { formatNumber } from "@/utils/formatting";
import { getCaretAndColor } from "@/utils/formatting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type ChartSelectorProps = {
  coins: Coin[];
  currentChart: string;
  currentCurrency: string;
  handleChartSelection: (selection: string) => void;
};

type CoinCardProps = {
  isCurrent: boolean;
};

type PercentChangeProps = {
  increase: boolean;
};

interface Coin {
  name: string;
  symbol: string;
  current_price: number;
  image: Url;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_change_24h: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
}

const ChartSelectorContainer = tw.div`
  relative
  bg-l-light-grey-background
  dark:bg-d-black-purple
`;

const ChartSelectorInnerContainer = tw.div`
  flex 
  whitespace-nowrap 
  overflow-x-auto 
  scrollbar-hide
  max-w-[100vw]
`;

const CoinCard = tw.div<CoinCardProps>`
  flex
  items-center
  p-4
  rounded-lg
  shadow-lg
  cursor-pointer
  m-2
  w-[400px]
  inline-block
  ${(props) =>
    props.isCurrent
      ? `border-t-[1px] border-l-[1px] border-r-[1px] border-opacity-50
    border-l-light-purple-border
    text-white
    bg-l-light-purple-highlight
    dark:border-d-purple-border
    dark:bg-d-purple-highlight
    dark:shadow-light
    `
      : `text-l-dark-purple
      dark:text-white
      dark:bg-d-grey-purple-1`}
`;

const ScrollButton = tw.div`
  absolute
  top-1/2
  bg-blue-300 
  text-white
  p-4
  rounded-full
  z-1
  cursor-pointer
`;

const CoinPriceDiv = tw.div`
  opacity-50
`;

const CoinInfoDiv = tw.div`
  flex
  flex-col
`;

const PercentChangeContainer = tw.div<PercentChangeProps>`
  ${(props) => (props.increase ? "text-green-change" : "text-red-change")}
`;

export const CoinSelectorCarousel = ({
  coins,
  currentChart,
  currentCurrency,
}: //COMMENTED OUT TO HOOK UP FAKE DATA, WILL ADD BACK WHEN USING API AGAIN
// handleChartSelection,
ChartSelectorProps) => {
  const handleSelection = (selection: string) => {
    //COMMENTED OUT TO HOOK UP FAKE DATA, WILL ADD BACK WHEN USING API AGAIN
    // handleChartSelection(selection);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  return (
    <ChartSelectorContainer>
      <ChartSelectorInnerContainer ref={scrollContainerRef}>
        {coins.map((coin: Coin, index: number) => {
          const isCurrent = coin.name === currentChart;
          const CaretColorObject = getCaretAndColor(
            coin.price_change_percentage_24h_in_currency
          );
          return (
            <CoinCard
              key={coin.symbol}
              isCurrent={isCurrent}
              onClick={() => handleSelection(coin.name)}
            >
              <Image
                src={`${coin.image}`}
                width={40}
                height={40}
                alt={`Image of ${coin.name}'s symbol`}
              />
              <CoinInfoDiv>
                <div>
                  {coin.name} ({coin.symbol})
                </div>
                <CoinPriceDiv>
                  {coin.current_price} {currentCurrency}
                </CoinPriceDiv>
              </CoinInfoDiv>
              <PercentChangeContainer increase={CaretColorObject.increase}>
                <FontAwesomeIcon icon={CaretColorObject.caret} />
                {formatNumber(coin.price_change_percentage_24h_in_currency)}%
              </PercentChangeContainer>
            </CoinCard>
          );
        })}
      </ChartSelectorInnerContainer>
      <ScrollButton className="right-0" onClick={scrollRight}>
        <FontAwesomeIcon icon={faArrowRight} />
      </ScrollButton>
      <ScrollButton className="left-0" onClick={scrollLeft}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </ScrollButton>
    </ChartSelectorContainer>
  );
};
