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
    return num.toString();
  };