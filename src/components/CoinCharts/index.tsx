import tw from "tailwind-styled-components";
import { Chart } from "../Chart";
import { CoinDataProps } from "../Chart";

const ChartContainer = tw.div`
  flex
  justify-center
  items-center
  h-96
  w-full
`;

type CoinChartsProps = {
  coinPriceData: CoinDataProps;
  coinVolumeData: CoinDataProps;
};

export const CoinCharts: React.FC<CoinChartsProps> = ({
  coinPriceData,
  coinVolumeData,
}) => {
  return (
    <ChartContainer>
      <Chart coinData={coinPriceData} hasAxis={true} isprice={true} />
      <Chart coinData={coinVolumeData} hasAxis={true} isprice={false} />
    </ChartContainer>
  );
};
