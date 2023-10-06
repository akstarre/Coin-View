import tw from "tailwind-styled-components";
import { ModularChart } from "../ModularChart";
import { CoinDataProps } from "../ModularChart";

const ComponentContainer = tw.div`
  flex
  justify-center
  items-center
  w-full
  h-[25vh]
  my-40
`;

const ChartsContainer = tw.div`
  flex
  justify-center
  align-center
  w-[75vw]
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
    <ComponentContainer>
      <ChartsContainer>
        <ModularChart coinData={coinPriceData} hasAxis={true} isprice={true} />
        <ModularChart
          coinData={coinVolumeData}
          hasAxis={true}
          isprice={false}
        />
      </ChartsContainer>
    </ComponentContainer>
  );
};
