export const isEmpty = (obj: object | undefined) =>
  Object.keys(obj || {}).length === 0;
