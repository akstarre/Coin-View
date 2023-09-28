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

const SwitchButton = tw.button`
  absolute
  top-0
  w-1/2
  h-full
  flex
  items-center
  justify-center
  left-0
`;

export const CoinPortfolioSwitch: React.FC = () => {
  const [selected, setSelected] = useState("coins");

  const handleCoinsSelection = () => {
    setSelected("coins");
  };

  const handlePorfolioSelection = () => {
    setSelected("portfolio");
  };
  return (
    <SwitchContainer>
      <ButtonSwitch selected={selected} />
      <SwitchButton onClick={handleCoinsSelection}>Coins</SwitchButton>
      <SwitchButton className="left-1/2" onClick={handlePorfolioSelection}>
        Portfolio
      </SwitchButton>
    </SwitchContainer>
  );
};
