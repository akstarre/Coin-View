"use client";

import tw from "tailwind-styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { Coin } from "../../../interfaces";
import { MarketListItem } from "../MarketListItem";
import { MarketTableHeader } from "../MarketTableHeader";

interface MarketTableProps {}

const MarketTableContainer = tw.div`
  flex 
  flex-col
  items-center
  w-full
  bg-l-light-grey-background
  dark:bg-d-black-purple
`;

const MTable = tw.div`

`;

const TableHeadCell = tw.div`
  py-2 
  px-4
`;

const MarketTable: React.FC<MarketTableProps> = () => {
  const { coins, loading, error } = useSelector(
    (state: RootState) => state.marketTable
  ) as { coins: Coin[]; loading: boolean; error: string };

  return (
    <MarketTableContainer>
      {loading ? (
        "Loading..."
      ) : error ? (
        `Error: ${error}`
      ) : (
        <MTable>
          <MarketTableHeader />
          {coins?.map((coin, index) => (
            <MarketListItem key={coin.symbol} coin={coin} index={index} />
          ))}
        </MTable>
      )}
    </MarketTableContainer>
  );
};

export default MarketTable;
