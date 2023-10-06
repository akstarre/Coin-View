"use client";

import React, { useState, useEffect, useRef } from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { reducePoints } from "@/utils/formatting";
import tw from "tailwind-styled-components";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

export type CoinDataProps = {
  prices: [number, number][];
};

type ChartProps = {
  coinData: CoinDataProps;
};

type BorderObject = {
  color: string;
  width: number;
};

const ChartContainer = tw.div`
  flex
  justify-center
  w-full
  p-2
  bg-white
  rounded-[10px]
  bg-transparent
`;

export const SparklineChart: React.FC<ChartProps> = ({ coinData }) => {
  const [gradientBackground, setGradientBackground] = useState<
    CanvasGradient | string
  >("rgba(75, 192, 192, 0.2)");

  const [border, setBorder] = useState<BorderObject>({
    color: "transparent",
    width: 0,
  });

  const options = {
    fill: true,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    pointRadius: 0,
    borderWidth: 2,
  };

  const data = {
    labels: reducePoints(coinData.prices, 4).map((price, i) => {
      let hour = new Date(price[0]).getHours();
      const amPm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour || 12;
      return (hour < 10 ? "0" : "") + hour;
    }),
    datasets: [
      {
        fill: false,
        label: "Coin Price",
        data: reducePoints(coinData.prices, 4).map((price) => price[1]),
        backgroundColor: gradientBackground,
        borderColor: "rgba(255,255,255,1)",
        borderWidth: 1,
        borderRadius: 3,
        tension: 0.4,
      },
    ],
  };

  return (
    <ChartContainer>
      <Chart type="line" data={data} options={options} />
    </ChartContainer>
  );
};
