"use client";

import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  registerables,
} from "chart.js";
import { reducePoints } from "@/utils/formatting";
import tw from "tailwind-styled-components";

ChartJS.register(...registerables);

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

const ChartContainer = tw.div<ChartContainerProps>`
  flex
  justify-center
  w-1/2
  h-96
  p-4
  m-4
  bg-white
  rounded-[10px]
  ${(props) =>
    props.isprice ? "dark:bg-d-price-chart" : "dark:bg-d-volume-chart"}
`;

export const Chart: React.FC<ChartProps> = ({ hasAxis, isprice, coinData }) => {
  const formattedData = () => {
    if (hasAxis) {
      return reducePoints(coinData.prices, 16);
    } else {
      return coinData.prices;
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
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
    fill: false,
  };

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
        fill: false,
        label: "Coin Price",
        data: formattedData().map((price) => price[1]),
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <ChartContainer isprice={isprice}>
      {isprice ? (
        <Line data={data} options={options} />
      ) : (
        <Bar data={data} options={options} />
      )}
    </ChartContainer>
  );
};
