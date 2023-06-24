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

export const useJellyfinHomeHeader = (
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

export const useJellyfinSearchHeader = (
  t: TFunction,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: t(`common:${Screens.SEARCH_SCREEN}`),
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerSearchBarOptions: {
        // obscureBackground: false,
        // tintColor: "#8e4ec6",
        // textTintColor: "#8e4ec6",
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

export const useJellyfinSettingsHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: Screens.SETTINGS_SCREEN,
      headerLargeTitle: true,
      contentStyle: { backgroundColor: "transparent" },
      headerRight: () => <HeaderRightWrapper />,
    } as NativeStackNavigationOptions);
  }, []);
};

export const useJellyfinDetailHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  headerTitle: string,
  headerOpacity?: Animated.AnimatedInterpolation<number>
) => {
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: headerOpacity ? true : false,
      // headerBackTitleVisible: false,
      // headerBackTitle: "",
      headerBackground: () => (
        <Animated.View
          style={{
            flex: 1,
            opacity: headerOpacity ?? 1,
          }}
        >
          <YStack
            width="100%"
            height="100%"
            backgroundColor="$background"
            // backgroundColor="red"
            alignItems="center"
            justifyContent="flex-end"
          >
            <XStack
              width="55%"
              height="$4"
              alignItems="center"
              justifyContent="center"
            >
              <H4 color="$color" numberOfLines={1}>
                {headerTitle}
              </H4>
            </XStack>
          </YStack>
        </Animated.View>
      ),
      headerRight: () => <HeaderRightWrapper />,
      headerTintColor: "#8e4ec6",
    } as NativeStackNavigationOptions);
  }, []);
};

export const useJellyfinModalHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  headerTitle: string,
  gestureEnabled?: boolean,
  dependencies?: any[]
) => {
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      gestureEnabled: gestureEnabled,
      headerLeft: () => (
        <XStack
          width="$2"
          height="$2.5"
          marginRight="$2"
          alignItems="center"
          justifyContent="center"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="close" size={30} color="#8e4ec6" />
        </XStack>
      ),
      // headerBackTitleVisible: false,
      // headerTintColor: "#8e4ec6",
    } as NativeStackNavigationOptions);
  }, [...(dependencies ? dependencies : [])]);
};
