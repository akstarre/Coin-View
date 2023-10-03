"use client";

import tw from "tailwind-styled-components";
import { Coin } from "../../../interfaces";
import { MarketListItem } from "../MarketListItem";
import { MarketTableHeader } from "../MarketTableHeader";

interface MarketTableProps {
  coins?: Coin[];
  loading: boolean;
  error: string;
}

const MarketTableContainer = tw.div`
  flex 
  flex-col
  items-center
  w-[100vw]
  bg-l-light-grey-background
  dark:bg-d-black-purple
`;

const MTable = tw.div`

`;

const TableHeadCell = tw.div`
  py-2 
  px-4
`;

const MarketTable: React.FC<MarketTableProps> = ({ coins, loading, error }) => {
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
