export const formatScore = (score: number) => {
  return new Intl.NumberFormat().format(score).toString();
};

export const abbreviateScore = (score: number) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(score);
};
