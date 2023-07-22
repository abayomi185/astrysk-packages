import React from "react";
import { Tabs } from "expo-router";

import * as TColors from "@tamagui/colors";

import { Ionicons } from "@expo/vector-icons";

import { Screens } from "@astrysk/constants";

export default (() => {
  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "",
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: TColors.purple.purple10,

          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case Screens.HOME_SCREEN_ROUTE:
                iconName = focused ? "albums" : "albums-outline";
                break;
              case Screens.SEARCH_SCREEN_ROUTE:
                iconName = focused ? "search" : "search-outline";
                break;
              case Screens.SETTINGS_SCREEN_ROUTE:
                iconName = focused ? "settings" : "settings-outline";
                break;
              default:
                iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          lazy: true,
        })}
      >
        <Tabs.Screen name={Screens.INDEX_ROUTE} options={{ href: null }} />
        <Tabs.Screen name={Screens.HOME_SCREEN_ROUTE} />
        <Tabs.Screen name={Screens.SEARCH_SCREEN_ROUTE} />
        <Tabs.Screen name={Screens.SETTINGS_SCREEN_ROUTE} />
      </Tabs>
    </>
  );
}) as React.FC;
