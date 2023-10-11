"use client";

import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "next-themes";
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
  increase: boolean;
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
  increase,
}) => {
  const chartRef = useRef<ChartJS<"line", number[], [number, number]>>(null);

  const [gradientBackground, setGradientBackground] = useState<
    CanvasGradient | string
  >("rgba(0,245,228,1)");
  const [borderColor, setBorderColor] = useState<string>("rgba(0,245,228,1)");

  const { theme, setTheme } = useTheme();

  const getChartBackground = () => {
    if (theme === "dark") {
      return "rgba(24,24,38,1)";
    } else {
      return "rgba(255, 255, 255, 1.0)";
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.canvas.getContext("2d");
      if (ctx) {
        const lineGradient = ctx.createLinearGradient(7, 0, 7, 48);
        if (increase) {
          lineGradient.addColorStop(0, "rgba(0,245,228,1)");
          lineGradient.addColorStop(1, getChartBackground());
        } else {
          setBorderColor("rgba(255,0,97,1)");
          lineGradient.addColorStop(0, "rgba(255,0,97,1)");
          lineGradient.addColorStop(1, getChartBackground());
        }
        setGradientBackground(lineGradient);
      }
    }
  }, [theme]);

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
        border: {
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
        border: {
          display: false,
        },
      },
    },
    pointRadius: 0,
    borderWidth: 2,
  };

  const data = {
    labels: reducePoints(coinData.prices, 4),
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
