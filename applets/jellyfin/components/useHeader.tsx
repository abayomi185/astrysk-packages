import React from "react";
import { HeaderRightWrapper } from "@astrysk/components";
import { H4, XStack, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Animated } from "react-native";
import {
  useHomeHeader,
  useSearchHeader,
  useSettingsHeader,
} from "@astrysk/components";
import { TFunction } from "i18next";
import { jellyfinColors } from "../colors";
import { ExtendedNavigationProp } from "@astrysk/types";

export const useJellyfinHomeHeader = () => {
  return useHomeHeader(HeaderRightWrapper);
};

export const useJellyfinSearchHeader = (t: TFunction) => {
  return useSearchHeader(t, HeaderRightWrapper);
};

export const useJellyfinSettingsHeader = () => {
  return useSettingsHeader(HeaderRightWrapper);
};

export const useJellyfinDetailHeader = (
  navigation: ExtendedNavigationProp,
  headerTitle: string,
  headerOpacity?: Animated.AnimatedInterpolation<number>
) => {
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
            // backgroundColor="red"
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
      headerTintColor: jellyfinColors.accentColor,
    } as NativeStackNavigationOptions);
  }, []);
};

export const useJellyfinModalHeader = (
  navigation: ExtendedNavigationProp,
  headerTitle: string,
  gestureEnabled?: boolean,
  dependencies?: any[]
) => {
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
          <Ionicons name="close" size={30} color={jellyfinColors.accentColor} />
        </XStack>
      ),
      // headerBackTitleVisible: false,
      // headerTintColor: jellyfinColors.accentColor,
    } as NativeStackNavigationOptions);
  }, [...(dependencies ? dependencies : [])]);
};
