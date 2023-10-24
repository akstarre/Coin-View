import React from "react";
import tw from "tailwind-styled-components";
import { CoinListData } from "@/app/GlobalRedux/Features/GlobalSlice";

type SearchCoinListProps = {
  coinList: CoinListData[] | null;
  handleSelection: (coinName: string) => void;
};

const CoinListDataDiv = tw.button`
    p-2
    w-full
    text-left
    text-l-dark-purple
    hover:text-white
    hover:bg-l-light-purple-highlight
    dark:hover:bg-d-purple-highlight
    dark:text-white
    scroll
`;

export const SearchCoinList = ({
  coinList,
  handleSelection,
}: SearchCoinListProps) => {
  return (
    <div>
      {coinList?.map((coin: CoinListData, index: number) => {
        return (
          <CoinListDataDiv
            key={`${coin.name} ${index}`}
            onClick={() => {
              handleSelection(coin.name);
            }}
          >
            {coin.name}
          </CoinListDataDiv>
        );
      })}
    </div>
  );
};
