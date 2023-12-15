export const convertBytesToGB = (bytes: number): number => {
  const gb = bytes / Math.pow(1024, 3);
  return Math.round(gb * 100) / 100;
};

export const getBytesToGBMultiplier = (): number => 1 / 1024 ** 3;
