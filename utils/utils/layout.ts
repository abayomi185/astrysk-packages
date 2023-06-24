import { SetStateAction } from "react";
import { LayoutChangeEvent } from "react-native";

export const onItemLayout =
  (height: number, setHeight: React.Dispatch<SetStateAction<number>>) =>
  (event: LayoutChangeEvent) => {
    const itemHeight = event.nativeEvent.layout.height;
    if (itemHeight > height) {
      setHeight(itemHeight);
    }
  };
