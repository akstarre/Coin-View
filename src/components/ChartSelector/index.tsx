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
    w-[75vw]    
`;

const ChartDivContainer = tw.div`
    flex
    w-[525px]
    rounded-lg
    text-l-dark-purple
    dark:text-white
    dark:bg-d-grey-purple-1`;

const ChartDiv = tw.div<ChartDivProps>`
    flex
    items-center
    p-4
    cursor-pointer
    w-[75px]
    `;

export const ChartSelector: React.FC<ChartSelectorProps> = ({
  chartSelection,
}) => {
  const handleSelection = (selection: string) => {};

  return (
    <ChartSelectorContainer>
      <ChartSelectorInnerContainer>
        <ChartDivContainer>
          {chartSelections.map((chart) => {
            const isCurrent = chart === chartSelection;
            return (
              <ChartDiv
                key="chart"
                isCurrent={isCurrent}
                onClick={() => handleSelection(chart)}
              >
                {chart}
              </ChartDiv>
            );
          })}
        </ChartDivContainer>
      </ChartSelectorInnerContainer>
    </ChartSelectorContainer>
  );
};
