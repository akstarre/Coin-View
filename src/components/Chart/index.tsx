"use client";

import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { BitcoinDailyData } from "@/app/FakeData/BitcoinDailyData";

ChartJS.register(CategoryScale, LinearScale, BarElement);

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
        display: false, // Removes the background grid lines for X-axis
      },
    },
    y: {
      display: false, // Removes the numbers for the y-axis
    },
  },
};

interface ChartDataInterface {}

type ChartProps = {
  chartType: string;
  chartData: ChartDataInterface;
  currentChart: string;
};

export const Chart = ({ chartType, chartData, currentChart }: ChartProps) => {
  //COMMENTED OUT TO HOOK UP FAKE DATA, WILL ADD BACK WHEN USING API AGAIN
  //   const currentTheme = localStorage.getItem('theme')
  //   const backgroundColor = currentTheme === 'dark' ? '#3D63EC' : '#00FC2A'

  // const data = {
  //   labels: chartData?.volumeDates.map(date => new Date(date).getDate()),
  //   datasets: [
  //     {
  //       fill: true,
  //       label: 'Volumes',
  //       data: bitcoinPriceVolumes,
  //       backgroundColor: backgroundColor,
  //     },
  //   ],
  // }

  return <div>{/* <Bar data={data} options={options} /> */}</div>;
};
