"use client";
import { useState } from "react";
import tw from "tailwind-styled-components";

const SwitchComponentContainer = tw.div`
  w-[75vw]
  p-8
  bg-l-light-grey-background
  dark:bg-d-black-purple
`;

const SwitchContainer = tw.div`
  relative
  w-[400px]
  h-12
  m-1
  p-1  
  bg-white
  dark:bg-d-grey-purple-1
  rounded-[10px]
  overflow-hidden
`;

const NestedSwitchContainer = tw.div`
  w-full
  h-full
  p-2 
  dark:bg-d-grey-purple-2
  rounded-[10px]
`;

const ButtonSwitch = tw.button<{ $selected: string }>`
  absolute
  top-0
  left-0
  w-1/2
  h-10
  m-1
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
  ${(props) =>
    props.$selected === "portfolio" && "transform translate-x-[96%]"} `;

const StyledButton = tw.button<{
  $buttonPosition: string;
  $selected: string;
}>`
  absolute
  top-0
  w-1/2
  h-full
  flex
  items-center
  justify-center
  text-l-dark-purple
  dark:text-white
  ${(props) => (props.$buttonPosition === "coins" ? "left-0" : "left-1/2")}
  ${(props) => props.$selected === props.$buttonPosition && "text-white"}
`;

export const CoinConverterSwitch: React.FC = () => {
  const [selected, setSelected] = useState("coins");

  const [coins, portfolio] = ["coins", "portfolio"];

  const handleCoinsSelection = () => {
    setSelected("coins");
  };

  const handleConverterSelection = () => {
    setSelected("portfolio");
  };
  return (
    <SwitchComponentContainer>
      <SwitchContainer>
        <NestedSwitchContainer>
          <ButtonSwitch $selected={selected} />
          <StyledButton
            $selected={selected}
            $buttonPosition={coins}
            onClick={handleCoinsSelection}
          >
            Coins
          </StyledButton>
          <StyledButton
            $selected={selected}
            $buttonPosition={portfolio}
            onClick={handleConverterSelection}
          >
            Converter
          </StyledButton>
        </NestedSwitchContainer>
      </SwitchContainer>
    </SwitchComponentContainer>
  );
};
