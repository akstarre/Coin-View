import tw from "tailwind-styled-components";
import { ModularChart } from "../ModularChart";
import { CoinDataProps } from "../ModularChart";

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
      <ModularChart coinData={coinPriceData} hasAxis={true} isprice={true} />
      <ModularChart coinData={coinVolumeData} hasAxis={true} isprice={false} />
    </ChartContainer>
  );
};
