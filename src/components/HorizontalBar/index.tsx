"use client";

import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

type HorizontalBarProps = {
  percentage: number;
  fillColor: string;
  backgroundColor: string;
};

const BarContainer = tw.div`
  barContainer 
  w-full 
  h-[8px]  
  rounded-full
`;

const BarOverlay = tw.div`
  h-full 
  rounded-full 
`;

export const HorizontalBar: React.FC<HorizontalBarProps> = ({
  percentage,
  fillColor,
  backgroundColor,
}) => {
  return (
    <BarContainer style={{ backgroundColor }}>
      <BarOverlay
        style={{ width: percentage + "%", backgroundColor: fillColor }}
      />
    </BarContainer>
  );
};
