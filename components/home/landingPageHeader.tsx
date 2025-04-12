import React from "react";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { HeaderRightWrapper } from "../common/headerRightWrapper";

import { Screens } from "@astrysk/constants";
import { ExtendedNavigationProp } from "@astrysk/types";

export const useLandingPageHeader = (navigation: ExtendedNavigationProp) => {
  return React.useEffect(() => {
    navigation.setOptions({
      headerTitle: Screens.HOME_LAB_LINK,
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerRight: () => <HeaderRightWrapper />,
    } as NativeStackNavigationOptions);
  }, []);
};
