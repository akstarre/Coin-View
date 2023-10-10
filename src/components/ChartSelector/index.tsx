import { useState } from "react";
import tw from "tailwind-styled-components";

const chartSelections = ["1D", "7D", "14D", "1M", "1W", "1Y", "5Y"];

type ChartSelectorProps = {
  chartSelection: string;
};

const ChartSelectorContainer = tw.div`
  flex
  justify-center
  items-center
  w-full
  h-[30vh]
 
`;

const ChartSelectorInnerContainer = tw.div`
  w-[75vw] 
  h-full   
`;

const ChartDivContainer = tw.div`
  relative
  flex
  w-[525px]
  rounded-lg
  font-medium
  text-l-dark-purple
  bg-l-light-purple-background
  dark:text-white
  dark:bg-d-grey-purple-1
  m-4
`;

const ChartButton = tw.button`
  flex
  justify-center
  items-center
  p-4
  cursor-pointer
  w-[75px]
`;

const ChartSelection = tw.div<{ istransitioning: boolean }>`
  absolute
  flex
  justify-center
  items-center
  top-1
  left-1
  w-[75px]
  h-[45px]
  text-black
  dark:text-white
  bg-l-light-purple-highlight
  dark:bg-d-purple-highlight
  focus:outline-none
  transition-transform
  duration-300
  ease-in-out
  rounded-[10px]
  border-t-[1px] border-l-[1px] border-r-[1px] border-opacity-50
  border-l-light-purple-border
  dark:border-d-purple-border 
  dark:shadow-light
  ${(props) => (props.istransitioning ? "text-opacity-0" : "text-opactiy-100")}
`;

export const ChartSelector: React.FC<ChartSelectorProps> = ({
  chartSelection,
}) => {
  const [currentSelection, setCurrentSelection] = useState("1D");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelection = (selection: string) => {
    if (selection === currentSelection) return;

    setIsTransitioning(true);
    setCurrentSelection(selection);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const currentIndex = chartSelections.indexOf(currentSelection);
  const translationAmount = currentIndex * 75;

  return (
    <ChartSelectorContainer>
      <ChartSelectorInnerContainer>
        <ChartDivContainer>
          <ChartSelection
            istransitioning={isTransitioning}
            style={{ transform: `translateX(${translationAmount}px)` }}
          >
            {currentSelection}
          </ChartSelection>

          {chartSelections.map((chart) => {
            return (
              <ChartButton key={chart} onClick={() => handleSelection(chart)}>
                {chart}
              </ChartButton>
            );
          })}
        </ChartDivContainer>
      </ChartSelectorInnerContainer>
    </ChartSelectorContainer>
  );
};
