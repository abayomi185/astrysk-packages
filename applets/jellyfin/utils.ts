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
  JellyfinSearchFilterContext,
} from "./types";
import { Router } from "@astrysk/types";
import { BaseItemDto, BaseItemKind, SearchHint } from "./api";

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

// NOTE: SEARCH / COLLECTION UTILS
export const goToSearchedItemDetailScreen = (
  router: Router,
  screenContext: JellyfinDetailScreenContext,
  searchContext: JellyfinSearchFilterContext,
  searchItemId: string,
  searchItemIndex: string
) => {
  const screenRoute =
    searchContext === JellyfinSearchFilterContext.Search
      ? Screens.SEARCH_SCREEN_DETAIL_ROUTE
      : Screens.HOME_SCREEN_DETAIL_ROUTE;
  router.push({
    pathname: `/${screenRoute}+${Crypto.randomUUID()}`,
    params: {
      context: screenContext,
      itemId: searchItemId, // Use id to check cache for data
      itemCacheIndex: searchItemIndex,
    } as JellyfinDetailScreenProps,
  });
};

const isBaseItemDto = (data: BaseItemDto | SearchHint): data is BaseItemDto => {
  return (data as BaseItemDto).UserData !== undefined;
};

// Intersection type to get typescript to stop complaining
export const filterSearchData = <T extends BaseItemDto | SearchHint>(
  data: T[],
  searchFilters: Record<string, any> | undefined
) => {
  let filteredData = data;

  // NOTE: May need to change "MediaSources" key
  if ("MediaSources" in filteredData[0]) {
    filteredData = filteredData.filter(
      (item) => item.Type !== BaseItemKind.Folder
    );
  }

  // WARN: This is not the best way to do this
  // isBaseItemDto type guard
  if (searchFilters?.["jellyfin:status"]) {
    if (searchFilters?.["jellyfin:status"] === "jellyfin:played") {
      filteredData = filteredData.filter(
        (data) => isBaseItemDto(data) && data.UserData?.Played === true
      );
    }
    if (searchFilters?.["jellyfin:status"] === "jellyfin:unplayed") {
      filteredData = filteredData.filter(
        (data) => isBaseItemDto(data) && data.UserData?.Played === false
      );
    }
    if (searchFilters?.["jellyfin:status"] === "jellyfin:favourite") {
      filteredData = filteredData.filter(
        (data) => isBaseItemDto(data) && data.UserData?.IsFavorite === true
      );
    }
  }

  if (searchFilters?.["jellyfin:order"]) {
    if (searchFilters?.["jellyfin:order"] === "jellyfin:nameAscending") {
      filteredData = filteredData.sort((a, b) =>
        (a.Name as string).localeCompare(b.Name as string)
      );
    } else if (
      searchFilters?.["jellyfin:order"] === "jellyfin:nameDescending"
    ) {
      filteredData = filteredData.sort((a, b) =>
        (b.Name as string).localeCompare(a.Name as string)
      );
    } else if (
      searchFilters?.["jellyfin:order"] === "jellyfin:premiereDateAscending"
    ) {
      filteredData = filteredData.sort(
        (a, b) => (a.ProductionYear as number) - (b.ProductionYear as number)
      );
    } else if (
      searchFilters?.["jellyfin:order"] === "jellyfin:premiereDateDescending"
    ) {
      filteredData = filteredData.sort(
        (a, b) => (b.ProductionYear as number) - (a.ProductionYear as number)
      );
    }
  }

  return filteredData;
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
export const TICK_TO_MILLISECOND_MULTIPLIER = 10000;
