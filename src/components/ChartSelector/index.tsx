"use client";
import React, { useRef } from 'react';


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
          behavior: 'smooth'
        });
      }
    };
  
    const scrollLeft = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({
          left: -200, 
          behavior: 'smooth'
        });
      }
    };
  
    return (
      <div className="relative">
        <div 
          ref={scrollContainerRef} 
          className="flex whitespace-nowrap overflow-x-auto scrollbar-hide" 
          style={{ maxWidth: '100vw' }}
        >
          {coins.map((coin, index) => {
            const isCurrent = coin.name === currentChart;
            return (
              <div
                key={index}
                className={`${
                  isCurrent ? 'bg-blue-300' : 'bg-blue-800'
                } p-4 rounded-lg shadow-lg cursor-pointer m-2 inline-block`}
                onClick={() => handleSelection(coin.name)}
                style={{ minWidth: '200px' }}
              >
                <div>{coin.name} ({coin.symbol})</div>
                <div>{coin.current_price} {currentCurrency}</div>
                <div>{coin.price_change_percentage_24h_in_currency}%</div>
              </div>
            );
          })}
        </div>
        <button 
          className="absolute top-1/2 right-0 bg-blue-300 text-white p-4 rounded-full"
          onClick={scrollRight}
          style={{ zIndex: 1 }}
        >
          ➡
        </button>
        <button 
          className="absolute top-1/2 left-0 bg-blue-300 text-white p-4 rounded-full"
          onClick={scrollLeft}
          style={{ zIndex: 1 }}
        >
          ⬅
        </button>
      </div>
    );
  };