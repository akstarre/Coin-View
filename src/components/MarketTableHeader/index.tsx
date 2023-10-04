import tw from "tailwind-styled-components";
import {
  NumberCell,
  NameCell,
  PriceCell,
  PercentChangeCell,
  HorizontalBarCell,
  SparklineCell,
} from "../MarketListItem";

const MarketTableHeaderContainer = tw.div`
    flex
    items-center
    mx-8
    my-2
    `;

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
