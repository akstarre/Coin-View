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
import { ChartData } from "@/app/GlobalRedux/Features/CoinChartSlice";

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
  isPrice: boolean;
  coinData: ChartData[];
};

type ChartContainerProps = {
  $isPrice: boolean;
};

type BorderObject = {
  color: string;
  width: number;
};

const ChartContainer = tw.div<ChartContainerProps>`
  relative
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
    props.$isPrice ? "dark:bg-d-price-chart" : "dark:bg-d-volume-chart"}
`;

export const ModularChart: React.FC<ChartProps> = ({ isPrice, coinData }) => {
  const chartRef = useRef<ChartJS<"line" | "bar", number[], string>>(null);

  const [gradientBackground, setGradientBackground] = useState<
    CanvasGradient | string
  >("rgba(75, 192, 192, 0.2)");

  const { theme, setTheme } = useTheme();

  const retreiveData = (index: number) => {
    if (coinData[index]) {
      return reducePoints(coinData[index].prices as [number, number][], 16);
    } else {
      return ["", ""];
    }
  };

  const getChartBackground = () => {
    if (theme === "dark" && isPrice) {
      return "rgba(25,25,52,1)";
    } else if (theme === "dark" && !isPrice) {
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
          display: true,
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
    labels: retreiveData(0).map((price, i) => {
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
        data: retreiveData(0).map((price) => price[1]),
        backgroundColor: gradientBackground,
        tension: 0.4,
      },
      {
        fill: true,
        label: "Coin Price",
        data: retreiveData(1).map((price) => price[1]),
        backgroundColor: gradientBackground,
        tension: 0.4,
      },
      {
        fill: true,
        label: "Coin Price",
        data: retreiveData(2).map((price) => price[1]),
        backgroundColor: gradientBackground,
        tension: 0.4,
      },
    ],
  };

  return (
    <ChartContainer $isPrice={isPrice}>
      <Chart
        ref={chartRef}
        type={isPrice ? "line" : "bar"}
        data={data}
        options={options}
      />
    </ChartContainer>
  );
};
