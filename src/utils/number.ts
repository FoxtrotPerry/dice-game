export const formatScore = (score: number) => {
  return new Intl.NumberFormat().format(score).toString();
};
