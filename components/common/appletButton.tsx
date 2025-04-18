import React from "react";
import { useRouter } from "expo-router";
import { styled, XStack, Text } from "tamagui";
import { Screens } from "@astrysk/constants";

import { appletUtils } from "@astrysk/utils";
import { useAppStateStore } from "@astrysk/stores";

interface AppletButtonProps {
  applet?: string;
  isBanner?: boolean;
}
export const AppletButton = ({ applet, isBanner }: AppletButtonProps) => {
  const applets = useAppStateStore.getState().applets;
  const { AppletIcon, bannerColor } = appletUtils.getAppletIcon(
    applet as string
  );

  const router = useRouter();

  const configureApplet = () => {
    if (applet) {
      const configured = applets[applet].configure();
      if (!configured) {
        router.push({
          pathname: `/${Screens.AUTH_MODAL_ROUTE}`,
          params: {
            applet: applet,
          },
        });
      } else {
        useAppStateStore.setState({ activeApplet: applet });
      }
    }
  };

  return (
    <SCAppletButton
      isBanner={isBanner}
      onPress={() => {
        !isBanner && configureApplet();
      }}
    >
      <XStack width="100%" height="100%" backgroundColor={bannerColor}>
        <XStack flex={1} maxWidth="$11" justifyContent="flex-end">
          <XStack flex={1} marginHorizontal="$3" maxWidth="$8">
            <AppletIcon width="100%" height="100%" />
          </XStack>
        </XStack>
        <XStack flex={1} marginLeft="$3" alignItems="center">
          <Text color="white" fontWeight="200" fontSize="$10">
            {applet}
          </Text>
        </XStack>
      </XStack>
    </SCAppletButton>
  );
};

export const AppletButtonBanner = (props: AppletButtonProps) => {
  return (
    <XStack justifyContent="center">
      <AppletButton {...props} isBanner />
    </XStack>
  );
};

const SCAppletButton = styled(XStack, {
  variants: {
    isBanner: {
      true: {
        width: "100%",
        height: "$11",
        padding: "$0",
        margin: "$0",
        borderRadius: "$0",
        pressStyle: { scale: 1 },
      },
    },
  } as const,

  height: "$12",
  // elevation: "$2", // Cannot calculate shadow efficiently
  marginVertical: "$1.5",
  width: "$24",
  justifyContent: "center",
  alignItems: "center",
  marginHorizontal: "$3",
  borderRadius: "$8",
  borderWidth: "$0",
  padding: "$0",
  overflow: "hidden",
  pressStyle: { scale: 0.97 },
  // animation: "bouncy", // This causes out of order hook error
  animation: "delay",
});
