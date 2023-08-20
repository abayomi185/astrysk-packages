import { useWindowDimensions } from "react-native";

const getListColumnNumber = (windowWidth: number, itemWidth: number) => {
  const cols = windowWidth / itemWidth;
  return Math.floor(cols);
};

export const useGetListColumnNumber = (itemWidth: number) => {
  const { width } = useWindowDimensions();
  return getListColumnNumber(width, itemWidth);
};
