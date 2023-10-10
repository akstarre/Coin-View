import tw from "tailwind-styled-components";
import {
  NumberCell,
  NameCell,
  PriceCell,
  HorizontalBarCell,
  SparklineCell,
} from "../MarketListItem";

const MarketTableHeaderContainer = tw.div`
    flex
    items-center
    justify-evenly
    w-full
    mx-8
    my-2
    `;

const PercentChangeCell = tw.div`
  w-28
  text-center
  py-3
  px-4`;

export const MarketTableHeader = () => {
  return (
    <MarketTableHeaderContainer>
      <NumberCell>#</NumberCell>
      <NameCell>Name</NameCell>
      <PriceCell>Price</PriceCell>
      <PercentChangeCell>1h%</PercentChangeCell>
      <PercentChangeCell>24h%</PercentChangeCell>
      <PercentChangeCell>7d%</PercentChangeCell>
      <HorizontalBarCell>24h Volume/Market Cap</HorizontalBarCell>
      <HorizontalBarCell>Circulating/Total Supply</HorizontalBarCell>
      <SparklineCell>Last 7d</SparklineCell>
    </MarketTableHeaderContainer>
  );
};
