import {
  HeaderRightWrapper,
  useFullScreenDetailHeader,
  useModalHeader,
} from "@astrysk/components";

import { Animated } from "react-native";
import { TFunction } from "i18next";
import {
  useHomeHeader,
  useSearchHeader,
  useSettingsHeader,
  useDetailHeader,
} from "@astrysk/components";
import { ollamaColors } from "../colors";

export const useOllamaHomeHeader = () => {
  return useHomeHeader(HeaderRightWrapper);
};

export const useOllamaSearchHeader = (t: TFunction) => {
  return useSearchHeader(t, HeaderRightWrapper);
};

export const useOllamaSettingsHeader = () => {
  return useSettingsHeader(HeaderRightWrapper);
};

export const useOllamaDetailHeader = (
  headerTitle: string,
  headerOpacity?: Animated.AnimatedInterpolation<number>
) => {
  return useDetailHeader(headerTitle, ollamaColors, headerOpacity);
};

export const useOllamaFsDetailHeader = (
  headerTitle: string,
  headerOpacity?: Animated.AnimatedInterpolation<number>,
  dependencies?: any[]
) => {
  return useFullScreenDetailHeader(
    headerTitle,
    ollamaColors,
    headerOpacity,
    dependencies
  );
};

export const useOllamaModalHeader = (
  headerTitle: string,
  gestureEnabled?: boolean,
  dependencies?: any[],
  headerRight?: () => React.ReactNode
) => {
  return useModalHeader(
    headerTitle,
    ollamaColors,
    gestureEnabled,
    dependencies,
    headerRight
  );
};
