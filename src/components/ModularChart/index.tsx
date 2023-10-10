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
  registerables,
  LineController,
  BarController,
} from "chart.js";
import { reducePoints } from "@/utils/formatting";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  LineController,
  BarController
);

export type CoinDataProps = {
  prices: [number, number][];
};

type ChartProps = {
  hasAxis: boolean;
  isprice: boolean;
  coinData: CoinDataProps;
};

type ChartContainerProps = {
  isprice: boolean;
};

type BorderObject = {
  color: string;
  width: number;
};

const ChartContainer = tw.div<ChartContainerProps>`
  flex
  justify-center
  w-full
  pt-40
  px-4
  pb-4
  m-4
  bg-white
  rounded-[10px]
  ${(props) =>
    props.isprice ? "dark:bg-d-price-chart" : "dark:bg-d-volume-chart"}
`;

export const ModularChart: React.FC<ChartProps> = ({
  hasAxis,
  isprice,
  coinData,
}) => {
  const chartRef = useRef<ChartJS<"line" | "bar", number[], string>>(null);

  const [gradientBackground, setGradientBackground] = useState<
    CanvasGradient | string
  >("rgba(75, 192, 192, 0.2)");

  const { theme, setTheme } = useTheme();

  const formattedData = () => {
    if (hasAxis) {
      return reducePoints(coinData.prices, 16);
    } else {
      return coinData.prices;
    }
  };

  const getChartBackground = () => {
    if (theme === "dark" && isprice) {
      return "rgba(25,25,52,1)";
    } else if (theme === "dark" && !isprice) {
      return "rgba(32,25,52, 1)";
    } else {
      return "rgba(255, 255, 255, 1.0)";
    }
  };

  const options = {
    fill: true,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: hasAxis,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
    pointRadius: 0,
    borderWidth: 0,
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.canvas.getContext("2d");
      if (ctx) {
        const barGradient = ctx.createLinearGradient(0, 0, 0, 400);
        barGradient.addColorStop(0, "rgba(165,94,221, 1)");
        barGradient.addColorStop(1, getChartBackground());

        const lineGradient = ctx.createLinearGradient(0, 0, 0, 400);
        lineGradient.addColorStop(0, "rgba(120,120,255,1)");
        lineGradient.addColorStop(1, getChartBackground());

        setGradientBackground(barGradient);
      }
    }
  }, [theme]);

  const data = {
    labels: formattedData().map((price, i) => {
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
        data: formattedData().map((price) => price[1]),
        backgroundColor: gradientBackground,
        tension: 0.4,
      },
    ],
  };

  return (
    <ChartContainer isprice={isprice}>
      <Chart
        ref={chartRef}
        type={isprice ? "line" : "bar"}
        data={data}
        options={options}
      />
    </ChartContainer>
  );
};
