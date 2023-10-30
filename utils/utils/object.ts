export const isEmpty = (obj: object | undefined) =>
  Object.keys(obj || {}).length === 0;

// Get the string value of a value, or empty string if undefined
export const getStringValue = (val: string | undefined) => (val ? val : "");

export const getNumberValue = (val: number | undefined) => Number(val || 0);
