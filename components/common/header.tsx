import React from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Animated } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Screens } from "@astrysk/constants";
import { TFunction } from "i18next";
import { useAppStateStore } from "@astrysk/stores";
import { H4, XStack, YStack } from "tamagui";
import { AppletColors } from "@astrysk/types";
import { HeaderRightWrapper } from "./headerRightWrapper";

export const useHomeHeader = (
  HeaderRightComponent: React.FC,
  largeTitle?: boolean
) => {
  const applet = useAppStateStore((state) => state.activeApplet) as string;
  const navigation = useNavigation();

  return React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: applet ?? Screens.ASTRYSK,
      headerLargeTitle: true,
      headerTransparent: largeTitle ?? true,
      headerBackTitleVisible: false,
      headerRight: () => <HeaderRightComponent />,
    } as NativeStackNavigationOptions);
  }, [navigation]);
};

export const useSearchHeader = (
  t: TFunction,
  HeaderRightComponent: React.FC
) => {
  const navigation = useNavigation();

  return React.useLayoutEffect(() => {
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

export const useSettingsHeader = (HeaderRightComponent: React.FC) => {
  const navigation = useNavigation();

  return React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: Screens.SETTINGS_SCREEN,
      headerLargeTitle: true,
      contentStyle: { backgroundColor: "transparent" },
      headerRight: () => <HeaderRightComponent />,
    } as NativeStackNavigationOptions);
  }, []);
};

export const useDetailHeader = (
  headerTitle: string,
  appletColors: AppletColors,
  headerOpacity?: Animated.AnimatedInterpolation<number>
) => {
  const navigation = useNavigation();

  return React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: headerOpacity ? true : false,
      headerBackTitleVisible: false,
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
            alignItems="center"
            justifyContent="flex-end"
          >
            <XStack
              width="50%"
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
      headerTintColor: appletColors.accentColor,
    } as NativeStackNavigationOptions);
  }, []);
};

export const useFullScreenDetailHeader = (
  headerTitle: string,
  appletColors: AppletColors,
  headerOpacity?: Animated.AnimatedInterpolation<number>,
  dependencies?: any[]
) => {
  const navigation = useNavigation();

  return React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: headerOpacity ? true : false,
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
          <Ionicons
            name="chevron-back"
            size={30}
            color={appletColors.accentColor}
          />
        </XStack>
      ),
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
            alignItems="center"
            justifyContent="flex-end"
          >
            <XStack
              width="50%"
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
      headerTintColor: appletColors.accentColor,
    } as NativeStackNavigationOptions);
  }, [...(dependencies ? dependencies : [])]);
};

export const useModalHeader = (
  headerTitle: string,
  appletColors: AppletColors,
  gestureEnabled?: boolean,
  dependencies?: any[],
  headerRight?: () => React.ReactNode
) => {
  const navigation = useNavigation();

  return React.useLayoutEffect(() => {
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
          <Ionicons name="close" size={30} color={appletColors.accentColor} />
        </XStack>
      ),
      headerRight: headerRight,
    } as NativeStackNavigationOptions);
  }, [...(dependencies ? dependencies : [])]);
};
