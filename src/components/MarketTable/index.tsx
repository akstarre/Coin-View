"use client";

interface MarketTableProps {
  coins?: Coin[];
  loading: boolean;
  error: string;
}

import { Coin } from "../../../interfaces";
import { MarketListItem } from "../MarketListItem";

const tableCategories = [
  "#",
  "Name",
  "Price",
  "1h%",
  "24h%",
  "7d%",
  "24h Volume/Market Cap",
  "Circulating/Total Supply",
  "Last 7d",
];

const MarketTable: React.FC<MarketTableProps> = ({ coins, loading, error }) => {
  return (
    <div className="flex flex-col ">
      <div className="mb-4 text-xl font-bold">Your Overview</div>
      {loading ? (
        "Loading..."
      ) : error ? (
        `Error: ${error}`
      ) : (
        <table className="min-w-full bg-blue-900 ">
          <thead>
            <tr>
              {tableCategories.map((category) => {
                return (
                  <th className="py-2 px-4 border" key={category}>
                    {category}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin, index) => (
              <MarketListItem key={coin.symbol} coin={coin} index={index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarketTable;
