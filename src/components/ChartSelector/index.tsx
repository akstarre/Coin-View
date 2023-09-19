"use client";
import React, { useRef } from "react";
import tw from "tailwind-styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { BtcLogo } from "../../../public/svg";

type ChartSelectorProps = {
  coins: Coin;
  currentChart: string;
  currentCurrency: string;
  handleChartSelection: (selection: string) => void;
};

interface Coin {
  name: string;
  symbol: string;
  current_price: number;
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
`;

const ChartSelectorInnerContainer = tw.div`
flex 
whitespace-nowrap 
overflow-x-auto 
scrollbar-hide
max-w-[100vw]
`;

const CoinCard = tw.div`
p-4
rounded-lg
shadow-lg
cursor-pointer
m-2
inline-block
max-w-[200px]
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

export const ChartSelector = ({
  coins,
  currentChart,
  currentCurrency,
  handleChartSelection,
}: ChartSelectorProps) => {
  const handleSelection = (selection: string) => {
    handleChartSelection(selection);
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
          return (
            <CoinCard
              key={index}
              className={isCurrent ? "bg-blue-300" : "bg-blue-800"}
              onClick={() => handleSelection(coin.name)}
            >
              <div>
                {coin.name} ({coin.symbol})
              </div>
              <div>
                {coin.current_price} {currentCurrency}
              </div>
              <div>{coin.price_change_percentage_24h_in_currency}%</div>
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
