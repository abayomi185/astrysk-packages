import { LayoutAnimation } from "react-native";
import { FlashList } from "@shopify/flash-list";

export const expandableItemAnimationHandler = <T>(
  flashListRef: React.RefObject<FlashList<T>>
) => {
  flashListRef.current?.prepareForLayoutAnimationRender();
  LayoutAnimation.configureNext({
    duration: 150,
    create: {
      property: "scaleXY",
      type: "spring",
      duration: 200,
      // springDamping: 0.5,
    },
    update: {
      type: "spring",
      springDamping: 1,
      duration: 300,
    },
    delete: {
      type: "linear",
      property: "opacity",
      duration: 200,
    },
  });
};
