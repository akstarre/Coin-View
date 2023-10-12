export const getPercentage = (quotient: number, dividend: number) => {
  return (quotient / dividend) * 100;
};

export const transformSparklineToChartFormat = (
  sparkline: number[],
  lastUpdated: string
): [number, number][] => {
  const interval = (24 * 60 * 60 * 1000) / sparkline.length; // assuming sparkline prices are distributed over 24 hours
  const lastUpdatedTimestamp = new Date(lastUpdated).getTime();

  return sparkline.map((price, index) => {
    // Subtracting (sparkline.length - 1 - index) * interval to start from 7 days ago
    const timestamp =
      lastUpdatedTimestamp - (sparkline.length - 1 - index) * interval;
    return [timestamp, price];
  });
};

export const fetchData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
