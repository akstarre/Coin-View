"use client";
import tw from "tailwind-styled-components";
import { useState } from "react";

const SwitchContainer = tw.div`
  relative
  w-48
  h-12
  bg-gray-800
  rounded-[5px]
  overflow-hidden
`;

const ButtonSwitch = tw.button<{ selected: string }>`
  absolute
  top-0
  left-0
  w-1/2
  h-full
  bg-blue-500
  text-white
  focus:outline-none
  transition-transform
  duration-300
  ease-in-out
  rounded-[10px]
  ${(props) => props.selected === "portfolio" && "transform translate-x-full"}
`;

const SwitchButton = tw.button<{ buttonType: string }>`
  absolute
  top-0
  w-1/2
  h-full
  flex
  items-center
  justify-center
  ${(props) => (props.buttonType === "coins" ? "left-0" : "left-1/2")}
`;

export const CoinPortfolioSwitch: React.FC = () => {
  const [selected, setSelected] = useState("coins");

  const [coins, portfolio] = ["coins", "portfolio"];

  const handleCoinsSelection = () => {
    setSelected("coins");
  };

  const handlePorfolioSelection = () => {
    setSelected("portfolio");
  };
  return (
    <SwitchContainer>
      <ButtonSwitch selected={selected} />
      <SwitchButton buttonType={coins} onClick={handleCoinsSelection}>
        Coins
      </SwitchButton>
      <SwitchButton buttonType={portfolio} onClick={handlePorfolioSelection}>
        Portfolio
      </SwitchButton>
    </SwitchContainer>
  );
};
