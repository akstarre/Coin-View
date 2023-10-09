import tw from "tailwind-styled-components";

const chartSelections = ["1D", "7D", "14D", "1M", "1W", "1Y", "5Y"];

type ChartSelectorProps = {
  chartSelection: string;
};

type ChartDivProps = {
  isCurrent: boolean;
};

const ChartSelectorContainer = tw.div`
    flex
    justify-center
    items-center
    w-full
    p-12

`;

const ChartSelectorInnerContainer = tw.div`
    flex
    w-[75vw]
`;

const ChartDiv = tw.div<ChartDivProps>`
  flex
  items-center
  p-4
  rounded-lg
  shadow-lg
  cursor-pointer
  m-2
  w-[400px]
  inline-block
  ${(props) =>
    props.isCurrent
      ? `border-t-[1px] border-l-[1px] border-r-[1px] border-opacity-50
    border-l-light-purple-border
    text-white
    bg-l-light-purple-highlight
    dark:border-d-purple-border
    dark:bg-d-purple-highlight
    dark:shadow-light
    `
      : `text-l-dark-purple
      dark:text-white
      dark:bg-d-grey-purple-1`}`;

export const ChartSelector: React.FC<ChartSelectorProps> = ({
  chartSelection,
}) => {
  return (
    <ChartSelectorContainer>
      <ChartSelectorInnerContainer>
        {chartSelections.map((chart) => {
          const isCurrent = chart === chartSelection;
          return (
            <ChartDiv key="chart" isCurrent={isCurrent}>
              {chart}
            </ChartDiv>
          );
        })}
      </ChartSelectorInnerContainer>
    </ChartSelectorContainer>
  );
};
