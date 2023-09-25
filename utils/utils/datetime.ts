export const MILLISECONDS_TO_MINUTES_MULTIPLIER = 60 * 1000;

export const getDateFromHours = (hours: number) => {
  return (hours / 24).toFixed(2);
};

export const getStartAndEndOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  const startOfWeek = new Date(date.getFullYear(), date.getMonth(), diff);
  startOfWeek.setHours(0, 0, 0, 0); // set the start of week to the first hour
  const endOfWeek = new Date(date.getFullYear(), date.getMonth(), diff + 6);
  endOfWeek.setHours(23, 59, 59, 999); // set the end of week to the last hour

  return [startOfWeek, endOfWeek];
};
