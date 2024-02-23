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

export const useProxmoxHomeHeader = () => {
  return useHomeHeader(HeaderRightWrapper);
};

export const useProxmoxSearchHeader = (t: TFunction) => {
  return useSearchHeader(t, HeaderRightWrapper);
};

export const useProxmoxSettingsHeader = () => {
  return useSettingsHeader(HeaderRightWrapper);
};

export const useProxmoxDetailHeader = (
  headerTitle: string,
  headerOpacity?: Animated.AnimatedInterpolation<number>
) => {
  return useDetailHeader(headerTitle, proxmoxColors, headerOpacity);
};

export const useProxmoxModalHeader = (
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
