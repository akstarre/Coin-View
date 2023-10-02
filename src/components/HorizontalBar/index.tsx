"use client";

import React, { useEffect, useRef } from "react";
import tw from "tailwind-styled-components";

type HorizontalBarProps = {
  percentage: number;
};

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

export const HorizontalBar: React.FC<HorizontalBarProps> = ({ percentage }) => {
  return (
    <BarContainer>
      <Bar percentage={percentage} />
    </BarContainer>
  );
};
