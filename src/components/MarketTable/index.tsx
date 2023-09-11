"use client";

interface Coin {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  roi: null | number;
  sparkline_in_7d: {
    price: number[];
  };
  symbol: string;
  total_supply: number;
  total_volume: number;
}

interface MarketTableProps {
  coins?: Coin[];
  loading: boolean;
  error: string;
}

import { MarketListItem } from "../MarketListItem";

const MarketTable: React.FC<MarketTableProps> = ({coins, loading, error}) => {
  return (
    <div className="flex flex-col ">
      <div className="mb-4 text-xl font-bold">Your Overview</div>
      {loading ? (
        'Loading...'
      ) : error ? (
        `Error: ${error}`
      ) : (
        <table className="min-w-full bg-blue-900 ">
          <thead>
            <tr>
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">1h%</th>
              <th className="py-2 px-4 border">24h%</th>
              <th className="py-2 px-4 border">7d%</th>
              <th className="py-2 px-4 border">24h Volume/Market Cap</th>
              <th className="py-2 px-4 border">Circulating/Total Supply</th>
              <th className="py-2 px-4 border">Last 7d</th>
            </tr>
          </thead>
          <tbody>
            {coins?.map((coin, index) => (
              <MarketListItem key={coin.id} coin={coin} index={index} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default MarketTable;
