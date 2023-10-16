import {
  faEuroSign,
  faDollarSign,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

export const formatNumber = (num: number) => {
  if (num > 1000000000000) {
    const finalNum = (num / 1000000000000).toFixed(2);
    return `${finalNum}T`;
  }
  if (num > 1000000) {
    const finalNum = (num / 1000000000).toFixed(2);
    return `${finalNum}B`;
  }
  if (num > 1000000) {
    const finalNum = (num / 1000000).toFixed(2);
    return `${finalNum}M`;
  }
  return num.toFixed(2);
};

export const formatChartNumber = (num: number) => {
  if (typeof num !== "number") {
    console.error("Invalid number:", num);
    return "Invalid";
  }
  if (num > 1000000000000) {
    const finalNum = (num / 1000000000000).toFixed(3);
    return `${finalNum} tln`;
  }
  if (num > 1000000) {
    const finalNum = (num / 1000000000).toFixed(3);
    return `${finalNum} bln`;
  }
  if (num > 1000000) {
    const finalNum = (num / 1000000).toFixed(3);
    return `${finalNum} mln`;
  }
  return num.toFixed(3);
};

export const getCurrencySymbol = (currency: string) => {
  switch (currency.toLowerCase()) {
    case "usd":
      return faDollarSign;
    case "eur":
      return faEuroSign;
    case "jpy":
      return faYenSign;
    default:
      return faDollarSign;
  }
};

export const getCaretAndColor = (num: number) => {
  if (num > 0) {
    return { caret: faCaretUp, increase: true };
  } else {
    return { caret: faCaretDown, increase: false };
  }
};

export const reducePoints = (
  arr: [number, number][] = [],
  reduceBy: number
) => {
  return arr.filter((_, i) => i % reduceBy === 0);
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
