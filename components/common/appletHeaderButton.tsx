import React from "react";
import { StackActions, CommonActions } from "@react-navigation/native";
import { useRouter, useNavigation } from "expo-router";
import { styled, XStack } from "tamagui";
import { appletUtils } from "@astrysk/utils";
import { useAppStateStore } from "@astrysk/stores";
import ContextMenu from "react-native-context-menu-view";
import { useTranslation } from "react-i18next";
import { Screens } from "@astrysk/constants";

export const AppletHeaderButton = () => {
  const applets = useAppStateStore.getState().applets; // Static applets
  const applet = useAppStateStore((state) => state.activeApplet); //Changes on applet change
  const AppletIcon = appletUtils.getAppletIcon(applet);

  const { t } = useTranslation();
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <XStack height="$2" width="$3.5">
      {applet && (
        <ContextMenu
          actions={[
            {
              title: `${t("common:general")}`,
              inlineChildren: true,
              actions: [
                {
                  index: 0,
                  title: `${t("common:changeApplet")}`,
                  systemIcon: "switch.programmable",
                },
              ],
            },
            {
              title: appletUtils.getAppletTitle(t, applet),
              inlineChildren: true,
              actions: [...applets[applet].contextMenu.getContextActions(t)],
            },
          ]}
          dropdownMenuMode
          onPress={(event) => {
            const { indexPath } = event.nativeEvent;
            if (indexPath[0] === 0)
              switch (indexPath[1]) {
                case 0:
                  useAppStateStore.setState({ activeApplet: undefined });
                  applets[applet]?.deconfigure?.();
                  // Go back to root of tab stack
                  navigation.dispatch(StackActions.popToTop());
                  // WARN: Add delay to prevent navigation from being blocked
                  router.push({
                    pathname: `/${Screens.HOME_SCREEN_ROUTE}`,
                  });
                  break;
              }
            applets[applet].contextMenu.getContextHandler(indexPath);
          }}
        >
          <SCAppletHeaderButton>
            {applet && <AppletIcon width="100%" height="100%" />}
          </SCAppletHeaderButton>
        </ContextMenu>
      )}
    </XStack>
  );
};

const SCAppletHeaderButton = styled(XStack, {
  width: "$2",
  height: "$2",
  pressStyle: { scale: 0.8 },
  animation: "delay",
  marginLeft: "$3",
});
