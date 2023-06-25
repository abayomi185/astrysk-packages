import React from "react";

import { create_axios_instance } from "@astrysk/api";
import * as DeviceInfo from "expo-device";
import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import { useJellyfinStore } from "./store";

import {
  registerLoadingComponent,
  unregisterLoadingComponent,
} from "@astrysk/components";
import { Actions, Screens } from "@astrysk/constants";
import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
} from "./types";
import { Router } from "@astrysk/types";
import config from "@astrysk/styles";

// NOTE: LOGIN / AUTHENTICATION / CONFIGURE
export const configureAxios = (
  baseURL: string,
  token?: string | null,
  customHeaders?: object,
  callback?: () => void
) => {
  const axiosConfig = {
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      "x-emby-authorization": `MediaBrowser , Client="${Constants.manifest?.name}", \
        Device="${DeviceInfo.deviceName}", DeviceId="${DeviceInfo.modelId}", \
        Version="${Constants.manifest?.version}"`,
      ...(token ? { "x-mediabrowser-token": token } : {}),
      ...(customHeaders ? customHeaders : {}),
    },
  };
  create_axios_instance(axiosConfig);
  callback && callback();
};

// Jellyfin configure function that all screens can run
// to authenticate and set up the applet appropriately
export const configureJellyfin = () => {
  const authenticated = useJellyfinStore.getState().authenticated;
  const isConfigured = useJellyfinStore.getState().isConfigured;

  // Check if token and baseURL exists
  const baseURL = useJellyfinStore.getState().baseURL;
  const token = useJellyfinStore.getState().token;
  const customHeaders = useJellyfinStore.getState().customHeaders;

  if (!baseURL) {
    return false;
  }

  if (isConfigured) {
    return true;
  }

  configureAxios(baseURL, token, customHeaders);

  useJellyfinStore.setState({ isConfigured: true });

  return true;
};

export const useJellyfinConfigurator = () => {
  return React.useEffect(() => {
    configureJellyfin();
  }, []);
};

// NOTE: DELAY RENDER - OLD, now using Suspense
export const useDelayedRender = (delay: number = 0) => {
  const [isDelayed, setIsDelayed] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsDelayed(false);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return isDelayed;
};

// NOTE: LOADING SPINNER
type LoadingStatus = "done" | "loading";
export const setLoadingSpinner = (
  componentId: string,
  isLoaded: LoadingStatus
) => {
  isLoaded === Actions.DONE
    ? unregisterLoadingComponent(componentId)
    : registerLoadingComponent(componentId);
};
export const useLoadingSpinner = (functionName: string) =>
  React.useEffect(() => {
    setLoadingSpinner(functionName, Actions.LOADING);
  }, []);

// NOTE: NEXT FUNCTION / ETC.

// NOTE: SEARCH UTILS
export const goToSearchedItemDetailScreen = (
  router: Router,
  context: JellyfinDetailScreenContext,
  searchItemId: string,
  searchItemIndex: string
) => {
  router.push({
    pathname: `/${Screens.SEARCH_SCREEN_DETAIL_ROUTE}+${Crypto.randomUUID()}`,
    params: {
      context: context,
      itemId: searchItemId, // Use id to check cache for data
      itemCacheIndex: searchItemIndex,
    } as JellyfinDetailScreenProps,
  });
};

// NOTE: ITEM UTILS
export const roundToNearestStandardResolution = (height: number) => {
  const standardResolutions = [240, 480, 720, 1080, 1440, 2160]; // Add or remove resolutions as needed

  let nearestResolution = standardResolutions[0];
  let minDifference = Math.abs(height - nearestResolution);

  for (let i = 1; i < standardResolutions.length; i++) {
    const difference = Math.abs(height - standardResolutions[i]);
    if (difference < minDifference) {
      nearestResolution = standardResolutions[i];
      minDifference = difference;
    } else if (height > standardResolutions[i]) {
      nearestResolution = standardResolutions[i + 1];
      break;
    }
  }
  return nearestResolution;
};

// NOTE: VIDEO UTILS
export const TICK_TO_SECOND_MULTIPLIER = 10000000;
