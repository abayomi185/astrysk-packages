export const isValidJSON = (options: string) => {
  try {
    JSON.parse(options);
    return true;
  } catch (e) {
    return false;
  }
};
