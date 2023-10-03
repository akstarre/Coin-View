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
    return { caret: faCaretUp, color: "green-change" };
  } else {
    return { caret: faCaretDown, color: "red-change" };
  }
};
