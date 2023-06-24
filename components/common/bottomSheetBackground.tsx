import React from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import { YStack } from "tamagui";

const BottomSheetBackgroundComponent: React.FC<BottomSheetBackgroundProps> = ({
  style,
}) => {
  return (
    <YStack
      height="100%"
      width="100%"
      backgroundColor="$background"
      pointerEvents="none"
      style={style}
    />
  );
};

export const BottomSheetBackground = React.memo(BottomSheetBackgroundComponent);
