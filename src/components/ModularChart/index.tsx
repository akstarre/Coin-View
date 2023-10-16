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

const options = {
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
      stacked: true,
    },
    "y-axis-1": {
      display: false,
      ticks: {
        display: false,
      },
    },
    "y-axis-2": {
      display: false,
      ticks: {
        display: false,
      },
    },
    "y-axis-3": {
      display: false,
      ticks: {
        display: false,
      },
    },
  },
  pointRadius: 0,
  borderWidth: 0,
};

const barFillColors = [
  "rgba(165,94,221, .5)",
  "rgba(120,120,255,.5)",
  "rgba(245,235,0, 1)",
];
const lineFillColors = [
  "rgba(120,120,255,0.28)",
  "rgba(165,94,221, .28)",
  "rgba(245,235,0, .28)",
];

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
  isLine: boolean;
  coinData: ChartData[];
};

type ChartContainerProps = {
  $isLine: boolean;
};

type BorderObject = {
  color: string;
  width: number;
}[];

type ChartDataSetting = {
  fill: boolean;
  label: string;
  data: number[];
  backgroundColor: CanvasGradient | string;
  borderColor: string;
  borderWidth: number;
  tension: number;
  order?: number;
  yAxisID?: string;
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
    props.$isLine ? "dark:bg-d-price-chart" : "dark:bg-d-volume-chart"}
`;

export const ModularChart: React.FC<ChartProps> = ({ isLine, coinData }) => {
  const chartRef = useRef<ChartJS<"line" | "bar", number[], string>>(null);
  const [finalChartData, setFinalChartData] = useState<ChartDataSetting[]>([]);
  const [border, setBorder] = useState<BorderObject>([
    {
      color: "transparent",
      width: 0,
    },
  ]);
  const [gradientBackground, setGradientBackground] = useState<
    CanvasGradient[] | string[]
  >(["rgba(75, 192, 192, 0.2)"]);
  const { theme, setTheme } = useTheme();

  const retreiveData = (index: number) => {
    if (coinData[index]) {
      if (isLine) {
        return reducePoints(coinData[index].prices as [number, number][], 16);
      } else {
        return reducePoints(
          coinData[index].total_volumes as [number, number][],
          16
        );
      }
    } else {
      return [[0, 0]];
    }
  };

  const getChartBackground = () => {
    if (theme === "dark" && isLine) {
      return "rgba(25,25,52,1)";
    } else if (theme === "dark" && !isLine) {
      return "rgba(32,25,52, 1)";
    } else {
      return "rgba(255, 255, 255, 1.0)";
    }
  };

  const isEmptyData = (data: ChartData) => {
    return data.prices[0][0] === 0 && data.prices[0][1] === 0;
  };

  const populateDataSet = (coinData: ChartData[]): ChartDataSetting[] => {
    let dataSet: ChartDataSetting[] = [];
    coinData.forEach((coin, i) => {
      if (!isEmptyData(coinData[i]) && border[i]) {
        const currentData = {
          fill: true,
          label: `Coin Price ${i + 1}`,
          data: retreiveData(i).map((price) => price[1]),
          backgroundColor: gradientBackground[i],
          borderColor: border[i].color,
          borderWidth: border[i].width,
          tension: 0.4,
          order: i + 1,
          yAxisID: `y-axis-${i + 1}`,
        };
        dataSet.push(currentData);
      }
    });
    return dataSet;
  };

  const finalDataChecker = () => {
    if (finalChartData) {
      return finalChartData;
    } else return [];
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.canvas.getContext("2d");
      if (ctx) {
        let gradientArray = [];
        let borderArray = [];
        for (let i = 0; i < coinData.length; i++) {
          const startingGradient = ctx.createLinearGradient(0, 0, 0, 400);
          if (isLine) {
            startingGradient.addColorStop(0, lineFillColors[i]);
            startingGradient.addColorStop(1, getChartBackground());
            borderArray.push({ color: lineFillColors[i], width: 4 });
          } else {
            startingGradient.addColorStop(0, barFillColors[i]);
            startingGradient.addColorStop(1, getChartBackground());
            borderArray.push({ color: "transparent", width: 0 });
          }
          gradientArray.push(startingGradient);
        }
        setGradientBackground(gradientArray);
        setBorder(borderArray);
      }
    }
  }, [theme, coinData]);

  useEffect(() => {
    setFinalChartData(populateDataSet(coinData));
  }, [border]);

  const data = {
    labels: retreiveData(0).map((price, i) => {
      let hour = new Date(price[0]).getHours();
      const amPm = hour >= 12 ? "PM" : "AM";
      hour = hour % 12;
      hour = hour || 12;
      return (hour < 10 ? "0" : "") + hour;
    }),
    datasets: finalDataChecker(),
  };

  return (
    <ChartContainer $isLine={isLine}>
      <Chart
        ref={chartRef}
        type={isLine ? "line" : "bar"}
        data={data}
        options={options}
      />
    </ChartContainer>
  );
};
