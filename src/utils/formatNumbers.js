export function formatNumber(num) {
  if (num === null || num === undefined) return "0";

  if (num >= 1_000_000) {
    const formatted = (num / 1_000_000).toFixed(1);
    return formatted.replace(/\.0$/, "") + "M";
  }

  if (num >= 1_000) {
    const formatted = (num / 1_000).toFixed(1);
    return formatted.replace(/\.0$/, "") + "k";
  }

  return num;
}

