"use client";


const MarketTable = ({coins:[]}) => {



  return (
    <div className="flex flex-col">
      <div className="mb-4 text-xl font-bold">Market Data</div>
      <div>
        {loading ? (
          'Loading...'
        ) : error ? (
          `Error: ${error}`
        ) : (
          coins.map((coin: any, index: number) => (
            <MarketListItem key={coin.id} coin={coin} />
          ))
        )}
      </div>
    </div>
  );
};

export default MarketTable;
