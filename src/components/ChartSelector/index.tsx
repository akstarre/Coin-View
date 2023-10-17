import { useState } from "react";
import tw from "tailwind-styled-components";
import { changeTimePeriod } from "../../app/GlobalRedux/Features/CurrentChartSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/GlobalRedux/store";

type ChartKey = "1D" | "7D" | "14D" | "1M" | "1Y" | "5Y";

type ChartObject = {
  "1D": string;
  "7D": string;
  "14D": string;
  "1M": string;
  "1Y": string;
  "5Y": string;
  Max: string;
};
const chartSelections = {
  "1D": "1",
  "7D": "7",
  "14D": "14",
  "1M": "28",
  "1Y": "365",
  "5Y": "1825",
  Max: "max",
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

const ChartSelection = tw.div<{ $isTransitioning: boolean }>`
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
  ${(props) => (props.$isTransitioning ? "text-opacity-0" : "text-opactiy-100")}
`;

export const ChartSelector = () => {
  const dispatch = useDispatch();

  const { currentTimePeriod } = useAppSelector((state) => state.currentCharts);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelection = (selection: ChartKey) => {
    if (selection === currentTimePeriod) return;
    setIsTransitioning(true);
    const selectionValue = chartSelections[selection];
    dispatch(changeTimePeriod(selectionValue));
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const getKeyByValue = (obj: ChartObject, value: string) => {
    for (let [key, val] of Object.entries(obj)) {
      if (val === value) {
        return key;
      }
    }
    return "";
  };

  const keysArray = Object.keys(chartSelections);
  const selectedKey = getKeyByValue(chartSelections, currentTimePeriod);
  const currentIndex = keysArray.indexOf(selectedKey);
  const translationAmount = currentIndex * 75;

  return (
    <ChartSelectorContainer>
      <ChartSelectorInnerContainer>
        <ChartDivContainer>
          <ChartSelection
            $isTransitioning={isTransitioning}
            style={{ transform: `translateX(${translationAmount}px)` }}
          >
            {selectedKey}
          </ChartSelection>
          {keysArray.map((chart) => {
            return (
              <ChartButton
                key={chart}
                onClick={() => handleSelection(chart as ChartKey)}
              >
                {chart}
              </ChartButton>
            );
          })}
        </ChartDivContainer>
      </ChartSelectorInnerContainer>
    </ChartSelectorContainer>
  );
};
