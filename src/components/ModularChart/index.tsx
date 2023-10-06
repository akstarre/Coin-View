"use client";

import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
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

  const [border, setBorder] = useState<BorderObject>({
    color: "transparent",
    width: 0,
  });

  const formattedData = () => {
    if (hasAxis) {
      return reducePoints(coinData.prices, 16);
    } else {
      return coinData.prices;
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

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.canvas.getContext("2d");
      if (ctx) {
        const barGradient = ctx.createLinearGradient(0, 0, 0, 400);
        barGradient.addColorStop(0, "rgba(165,94,221, 1)");
        barGradient.addColorStop(1, "rgba(32,25,52, 1)");

        const lineGradient = ctx.createLinearGradient(0, 0, 0, 400);
        lineGradient.addColorStop(0, "rgba(120,120,255,1)");
        lineGradient.addColorStop(1, "rgba(25,25,52,1)");

        if (isprice) {
          setGradientBackground(lineGradient);
          setBorder({ color: "rgba(120,120,255, 1)", width: 2 });
        } else {
          setGradientBackground(barGradient);
        }
      }
    }
  }, [isprice]);

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
        borderColor: border.color,
        borderWidth: border.width,
        borderRadius: 3,
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
