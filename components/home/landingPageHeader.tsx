import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { HeaderRightWrapper } from "../common/headerRightWrapper";

import { Screens } from "@astrysk/constants";

export const useLandingPageHeader = (
  navigation: NavigationProp<ReactNavigation.RootParamList>
) => {
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: Screens.HOME_LAB_LINK,
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerRight: () => <HeaderRightWrapper />,
    } as NativeStackNavigationOptions);
  }, []);
};
