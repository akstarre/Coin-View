"use client";

import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

type HorizontalBarProps = {
  percentage: number;
};

export const HorizontalBar: React.FC<HorizontalBarProps> = ({ percentage }) => {
  const BarContainer = tw.div`
    w-full 
    h-[4px] 
    bg-gray-600 
    rounded-full
  `;

  const Bar = tw.div<{ percentage: number }>`
  h-full 
  rounded-full 
  bg-green-400
  ${(props) => `w-[${props.percentage}%]`}
`;

  return (
    <BarContainer>
      <Bar percentage={percentage} />
    </BarContainer>
  );
};
