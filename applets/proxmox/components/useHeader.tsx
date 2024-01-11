import { NavigationProp } from "@react-navigation/native";
import { HeaderRightWrapper, useModalHeader } from "@astrysk/components";

import { Animated } from "react-native";
import { TFunction } from "i18next";
import {
  useHomeHeader,
  useSearchHeader,
  useSettingsHeader,
  useDetailHeader,
} from "@astrysk/components";
import { proxmoxColors } from "../colors";

export const useProxmoxHomeHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return useHomeHeader(HeaderRightWrapper);
};

export const useProxmoxSearchHeader = (
  t: TFunction,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return useSearchHeader(t, HeaderRightWrapper);
};

export const useProxmoxSettingsHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return useSettingsHeader(HeaderRightWrapper);
};

export const useProxmoxDetailHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  headerTitle: string,
  headerOpacity?: Animated.AnimatedInterpolation<number>
) => {
  return useDetailHeader(headerTitle, proxmoxColors, headerOpacity);
};

export const useProxmoxModalHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  headerTitle: string,
  gestureEnabled?: boolean,
  dependencies?: any[]
) => {
  return useModalHeader(
    headerTitle,
    proxmoxColors,
    gestureEnabled,
    dependencies
  );
};
