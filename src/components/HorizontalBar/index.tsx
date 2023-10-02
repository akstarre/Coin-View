"use client";

import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

type HorizontalBarProps = {
  percentage: number;
};

type BarOverlayProps = {
  percentage: number;
};

const BarContainer = tw.div`
  barContainer 
  w-full 
  h-[4px] 
  bg-gray-600 
  rounded-full
`;

const BarOverlay = tw.div<BarOverlayProps>`
  h-full 
  rounded-full 
  bg-green-400
  ${(props) => `w-[${props.percentage}%]`}
`;

export const HorizontalBar: React.FC<HorizontalBarProps> = ({ percentage }) => {
  return (
    <BarContainer>
      <BarOverlay percentage={percentage} />
    </BarContainer>
  );
};
