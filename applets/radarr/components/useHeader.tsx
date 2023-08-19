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
import {
  useHomeHeader,
  useSearchHeader,
  useSettingsHeader,
} from "@astrysk/utils";
import { radarrColors } from "../colors";

export const useRadarrHomeHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
  // largeTitle: boolean
) => {
  return useHomeHeader(navigation, HeaderRightWrapper);
};

export const useRadarrSearchHeader = (
  t: TFunction,
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return useSearchHeader(t, navigation, HeaderRightWrapper);
};

export const useRadarrSettingsHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return useSettingsHeader(navigation, HeaderRightWrapper);
};

export const useRadarrDetailHeader = (
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
      headerTintColor: radarrColors.accentColor,
    } as NativeStackNavigationOptions);
  }, []);
};

export const useRadarrModalHeader = (
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
          <Ionicons name="close" size={30} color={radarrColors.accentColor} />
        </XStack>
      ),
      // headerBackTitleVisible: false,
      // headerTintColor: sonarrColors.accentColor,
    } as NativeStackNavigationOptions);
  }, [...(dependencies ? dependencies : [])]);
};
