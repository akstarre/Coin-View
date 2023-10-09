import tw from "tailwind-styled-components";
import { ChartSelector } from "@/components/ChartSelector";
import { ModularChart } from "../ModularChart";
import { CoinDataProps } from "../ModularChart";

const ComponentContainer = tw.div`
  flex
  flex-col
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
  // handleTimeChartSelection
}) => {
  const handleTimeChartSelection = (selection: string) => {
    handleTimeChartSelection(selection);
  };
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
      <ChartSelector
        // handleTimeChartSelection={handleTimeChartSelection}
        chartSelection={"1D"}
      />
    </ComponentContainer>
  );
};
