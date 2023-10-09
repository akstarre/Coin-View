import tw from "tailwind-styled-components";

const chartSelections = ["1D", "7D", "14D", "1M", "1W", "1Y", "5Y"];

const ChartSelectorContainer = tw.div`
w-full

`;

const ChartSelectorInnerContainer = tw.div``;

const ChartDiv = tw.div``;

const ChartSelector = () => {
  return (
    <ChartSelectorContainer>
      <ChartSelectorInnerContainer>
        {chartSelections.map((chart) => {
          return <ChartDiv>{chart}</ChartDiv>;
        })}
      </ChartSelectorInnerContainer>
    </ChartSelectorContainer>
  );
};
