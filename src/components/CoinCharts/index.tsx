import tw from "tailwind-styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/GlobalRedux/store";
import { useAppSelector } from "@/app/GlobalRedux/store";
import { ChartSelector } from "@/components/ChartSelector";
import { ModularChart } from "../ModularChart";
import { CoinDataProps } from "../ModularChart";

const ComponentContainer = tw.div`
  flex
  flex-col
  justify-center
  items-center
  w-full
  h-[30vh]
  my-44
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
  const dispatch = useDispatch<AppDispatch>();

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
      <ChartSelector chartSelection={"1D"} />
    </ComponentContainer>
  );
};
