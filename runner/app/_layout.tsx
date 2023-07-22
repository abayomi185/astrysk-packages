import React from "react";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "@react-navigation/native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { TamaguiProvider, Theme, YStack } from "tamagui";

import { QueryClientProvider } from "@tanstack/react-query";

import "@astrysk/locales";
import { Applets } from "@astrysk/constants";
import themeConfig from "@astrysk/styles";
import { useColorScheme } from "@astrysk/utils";
import { queryClient } from "@astrysk/api";
import { Screens } from "@astrysk/constants";
import { AuthProvider } from "@astrysk/api";
import { useAppStateStore } from "@astrysk/stores";

import {activeApplet} from "@applet"

// Prevent hiding the splash screen
SplashScreen.preventAutoHideAsync();

export const navContainerLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export const navContainerDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
  },
};

export default (() => {
  const colorScheme = useColorScheme();


  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const _onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [appletName, appletInstance] = activeApplet;

  React.useEffect(() => {
    useAppStateStore.setState({ applets: {[appletName]: appletInstance}, activeApplet: appletName });
  }, []);

  if (!fontsLoaded) {
    return (
      <YStack
        height="100%"
        width="100%"
        backgroundColor={colorScheme === "dark" ? "#000000" : "#FFFFFF"}
      />
    );
  }

  return (
    <ThemeProvider
      value={
        colorScheme === "dark" ? navContainerDarkTheme : navContainerLightTheme
      }
    >
      <TamaguiProvider
        config={themeConfig}
        defaultTheme={colorScheme as string}
      >
        <Theme name={colorScheme === "dark" ? "dark" : "light"}>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Stack>
                <Stack.Screen name="(root)" options={{ headerShown: false }} />
                <Stack.Screen
                  name={Screens.ROOT_MODAL_ROUTE}
                  options={{ presentation: "modal", orientation: "portrait" }}
                />
                <Stack.Screen
                  name={Screens.ROOT_FS_MODAL_ROUTE}
                  options={{
                    presentation: "fullScreenModal",
                    headerShown: false,
                    autoHideHomeIndicator: true,
                  }}
                />
                <Stack.Screen
                  name={Screens.ROOT_DETAIL_ROUTE}
                  options={{
                    headerTitle: "Root Detail",
                  }}
                />
              </Stack>
            </QueryClientProvider>
          </AuthProvider>
        </Theme>
      </TamaguiProvider>
    </ThemeProvider>
  );
}) as React.FC;
