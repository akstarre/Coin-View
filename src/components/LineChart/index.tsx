"use client";

import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration, ChartData } from "chart.js/auto";

export const LineChart = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (chartRef.current) {
            const myChartRef = chartRef.current.getContext("2d")

            const data: ChartData<`line`, number[], unknown> = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91, 45, 78],
                        fill: false,
                        backgroundColor: "rgb(75, 192, 192)",
                        borderColor: "rgba(75, 192, 192, 0.2)",
                    }
                ]
            };

            const config: ChartConfiguration<`line`, number[], unknown> = {
                type: "line",
                data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        }
                    }
                },
            }

            if (myChartRef !== null)
                new Chart(myChartRef, config)
        }
    }, [])


    return (<>
        <div>
            <canvas id="myChart" ref={chartRef}></canvas>
        </div>
    </>)
}