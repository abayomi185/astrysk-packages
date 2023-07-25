import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { HeaderRightWrapper } from "@astrysk/components";
import { Screens } from "@astrysk/constants";
import { useAppStateStore } from "@astrysk/stores";
import { H4, XStack, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Animated } from "react-native";
import { TFunction } from "i18next";

export const useSonarrHomeHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  const applet = useAppStateStore((state) => state.activeApplet) as string;
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: applet ?? Screens.ASTRYSK,
      headerLargeTitle: true,
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerRight: () => <HeaderRightWrapper />,
    } as NativeStackNavigationOptions);
  }, [navigation]);
};

export const useSonarrSearchHeader = (
  t: TFunction,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: t(`common:${Screens.SEARCH_SCREEN}`),
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerSearchBarOptions: {
        hideWhenScrolling: false,
        onChangeText: (event) => {
          navigation.setParams({
            searchPathName: "search",
            searchQuery: event.nativeEvent.text,
          } as any);
        },
      },
      contentStyle: { backgroundColor: "transparent" },
      headerRight: () => <HeaderRightWrapper />,
    } as NativeStackNavigationOptions);
  }, []);
};
