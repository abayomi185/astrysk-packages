import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
// import { HeaderRightWrapper } from "@astrysk/components";
import { Screens } from "@astrysk/constants";
import { TFunction } from "i18next";
import { useAppStateStore } from "@astrysk/stores";

export const useHomeHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  HeaderRightComponent: React.FC
) => {
  const applet = useAppStateStore((state) => state.activeApplet) as string;
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: applet ?? Screens.ASTRYSK,
      headerLargeTitle: true,
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerRight: () => <HeaderRightComponent />,
    } as NativeStackNavigationOptions);
  }, [navigation]);
};

export const useSearchHeader = (
  t: TFunction,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  HeaderRightComponent: React.FC
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
      headerRight: () => <HeaderRightComponent />,
    } as NativeStackNavigationOptions);
  }, []);
};

export const useSettingsHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  HeaderRightComponent: React.FC
) => {
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: Screens.SETTINGS_SCREEN,
      headerLargeTitle: true,
      contentStyle: { backgroundColor: "transparent" },
      headerRight: () => <HeaderRightComponent />,
    } as NativeStackNavigationOptions);
  }, []);
};
