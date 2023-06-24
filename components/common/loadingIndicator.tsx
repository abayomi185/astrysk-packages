import React from "react";
import { Applets } from "@astrysk/constants";
import { useAppStateStore } from "@astrysk/stores";
import { XStack, Spinner, ColorTokens } from "tamagui";

const spinnerColorMapping: { [applet: string]: ColorTokens } = {
  [Applets.JELLYFIN]: "$purple9Dark",
};

export const registerLoadingComponent = (componentId: string) => {
  let componentsLoading = useAppStateStore.getState().componentsLoading;
  componentsLoading
    ? componentsLoading.add(componentId)
    : (componentsLoading = new Set());
  useAppStateStore.setState({
    componentsLoading: componentsLoading,
    showSpinner: true,
  });
};

export const unregisterLoadingComponent = (componentId: string) => {
  const componentsLoading = useAppStateStore.getState().componentsLoading;
  componentsLoading && componentsLoading.delete(componentId);
  if (componentsLoading?.size === 0)
    useAppStateStore.setState({
      // Resets or adds an empty Set; fixes dirty state
      componentsLoading: new Set(),
      showSpinner: false,
    });
  else useAppStateStore.setState({ componentsLoading: componentsLoading });
};

export const resetLoadingComponent = () => {
  useAppStateStore.setState({
    componentsLoading: new Set(),
    showSpinner: false,
  });
};

export const LoadingIndicator = () => {
  const applet = useAppStateStore((state) => state.activeApplet) as string;
  const showSpinner = useAppStateStore((state) => state.showSpinner);

  return (
    <XStack
      display="flex"
      width="$1"
      justifyContent="center"
      alignItems="center"
    >
      {showSpinner && <Spinner color={spinnerColorMapping[applet]} />}
    </XStack>
  );
};
