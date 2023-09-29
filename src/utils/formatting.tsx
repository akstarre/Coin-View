import {
  faEuroSign,
  faDollarSign,
  faYenSign,
} from "@fortawesome/free-solid-svg-icons";

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