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
  changeIncrease: boolean;
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

export const SparklineChart: React.FC<ChartProps> = ({
  coinData,
  changeIncrease,
}) => {
  const chartRef = useRef<ChartJS<"line", number[], string>>(null);

  const [gradientBackground, setGradientBackground] = useState<
    CanvasGradient | string
  >("rgba(0,245,228,1)");
  const [borderColor, setBorderColor] = useState<string>("rgba(0,245,228,1)");

  const [border, setBorder] = useState<BorderObject>({
    color: "transparent",
    width: 0,
  });

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.canvas.getContext("2d");
      if (ctx) {
        const lineGradient = ctx.createLinearGradient(7, 0, 7, 48);
        if (changeIncrease) {
          lineGradient.addColorStop(0, "rgba(0,245,228,1)");
          lineGradient.addColorStop(1, "rgba(24,24,38,1)");
        } else {
          setBorderColor("rgba(255,0,97,1)");
          lineGradient.addColorStop(0, "rgba(255,0,97,1)");
          lineGradient.addColorStop(1, "rgba(24,24,38,1)");
        }
        setGradientBackground(lineGradient);
      }
    }
  }, []);

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
        fill: true,
        label: "Coin Price",
        data: reducePoints(coinData.prices, 4).map((price) => price[1]),
        backgroundColor: gradientBackground,
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 3,
        tension: 0.4,
      },
    ],
  };

  return (
    <ChartContainer>
      <Chart ref={chartRef} type="line" data={data} options={options} />
    </ChartContainer>
  );
};
