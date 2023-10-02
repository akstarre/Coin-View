"use client";

import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

type HorizontalBarProps = {
  percentage: number;
};

const BarContainer = tw.div`
  barContainer 
  w-full 
  h-[4px] 
  bg-gray-600 
  rounded-full
`;

const BarOverlay = tw.div`
  h-full 
  rounded-full 
  bg-green-400
  
`;

export const HorizontalBar: React.FC<HorizontalBarProps> = ({ percentage }) => {
  return (
    <BarContainer>
      <BarOverlay style={{ width: percentage + "%" }} />
    </BarContainer>
  );
};
