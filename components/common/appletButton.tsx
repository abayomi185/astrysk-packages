import React from "react";
import { useRouter } from "expo-router";
import { styled, XStack } from "tamagui";
import { Screens } from "@astrysk/constants";

import { appletUtils } from "@astrysk/utils";
import { useAppStateStore } from "@astrysk/stores";

interface AppletButtonProps {
  applet?: string;
  isBanner?: boolean;
}
export const AppletButton = ({ applet, isBanner }: AppletButtonProps) => {
  const applets = useAppStateStore.getState().applets;
  const AppletButtonLogo = appletUtils.getAppletLogo(applet as string);

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
      <AppletButtonLogo
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      />
    </SCAppletButton>
  );
};

export const AppletButtonBanner = (props: AppletButtonProps) => {
  return <AppletButton {...props} isBanner />;
};

const SCAppletButton = styled(XStack, {
  variants: {
    isBanner: {
      true: {
        height: "$11",
        padding: "$0",
        margin: "$0",
        borderRadius: "$0",
        pressStyle: undefined,
      },
    },
  } as const,

  defaultVariants: {
    height: "$12",
    // elevation: "$2", // Cannot calculate shadow efficiently
    marginTop: "$3",
    marginHorizontal: "$3",
    borderRadius: "$8",
    borderWidth: "$0",
    padding: "$0",
    overflow: "hidden",
    pressStyle: { scale: 0.97 },
    // animation: "bouncy", // This causes out of order hook error
    animation: "delay",
  },
});
