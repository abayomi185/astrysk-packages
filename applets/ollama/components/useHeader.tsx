import { NavigationProp } from "@react-navigation/native";
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

export const useOllamaHomeHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return useHomeHeader(HeaderRightWrapper);
};

export const useOllamaSearchHeader = (
  t: TFunction,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return useSearchHeader(t, HeaderRightWrapper);
};

export const useOllamaSettingsHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return useSettingsHeader(HeaderRightWrapper);
};

export const useOllamaDetailHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  headerTitle: string,
  headerOpacity?: Animated.AnimatedInterpolation<number>
) => {
  return useDetailHeader(headerTitle, ollamaColors, headerOpacity);
};

export const useOllamaFsDetailHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
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
  navigation: NavigationProp<ReactNavigation.RootParamList>,
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
