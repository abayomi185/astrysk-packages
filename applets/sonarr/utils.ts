import React from "react";

import { create_axios_instance } from "@astrysk/api";
import * as Crypto from "expo-crypto";
import { useSonarrStore } from "./store";

import { Screens } from "@astrysk/constants";
import { FilterOrder, Router, TabContext, ViewType } from "@astrysk/types";
import {
  SonarrDetailScreenContext,
  SonarrDetailScreenProps,
  SonarrSearchFilterContext,
} from "./types";
import { SeriesResource, SeriesStatusType, postApiV3Command } from "./api";
import { MILLISECONDS_TO_MINUTES_MULTIPLIER } from "@astrysk/utils";

// NOTE: LOGIN / AUTHENTICATION / CONFIGURE
export const configureAxiosForSonarr = (
  baseURL: string,
  token?: string | null,
  customHeaders?: object,
  callback?: () => void
) => {
  const axiosConfig = {
    baseURL: baseURL,
    params: {
      apikey: token,
    },
  };
  create_axios_instance(axiosConfig);
  callback && callback();
};

// Jellyfin configure function that all screens can run
// to authenticate and set up the applet appropriately
export const configureSonarr = () => {
  const isConfigured = useSonarrStore.getState().isConfigured;

  // Check if token and baseURL exists
  const baseURL = useSonarrStore.getState().baseURL;
  const token = useSonarrStore.getState().token;
  const customHeaders = useSonarrStore.getState().customHeaders;

  if (!baseURL) {
    return false;
  }

  if (isConfigured) {
    return true;
  }

  configureAxiosForSonarr(baseURL, token, customHeaders);

  useSonarrStore.setState({ isConfigured: true });

  return true;
};

export const useSonarrConfigurator = () => {
  return React.useEffect(() => {
    configureSonarr();
  }, []);
};

export const deConfigureSonarr = () => {
  useSonarrStore.setState({ isConfigured: false });
};

// NOTE: SEARCH / COLLECTION UTILS
export const goToSonarrDetailScreen = ({
  router,
  searchItemId,
  tabContext,
  seasonNumber,
  screenContext,
  searchContext,
}: {
  router: Router;
  searchItemId: number;
  tabContext: TabContext;
  seasonNumber?: number;
  screenContext?: SonarrDetailScreenContext;
  searchContext?: SonarrSearchFilterContext;
}) => {
  const screenRoute =
    tabContext === TabContext.Search
      ? Screens.SEARCH_SCREEN_DETAIL_ROUTE
      : Screens.HOME_SCREEN_DETAIL_ROUTE;
  router.push({
    pathname: `/${screenRoute}+${Crypto.randomUUID()}`,
    params: {
      context: screenContext,
      itemId: searchItemId, // Use id to check cache for data
      tabContext: tabContext,
      seasonNumber: seasonNumber,
    } as SonarrDetailScreenProps,
  });
};

export const goToSonarrModalScreen = ({
  router,
  searchItemId,
  episodeId,
  seasonNumber,
  screenContext,
  searchContext,
  tvdbId,
}: {
  router: Router;
  searchItemId: number;
  episodeId?: number;
  seasonNumber?: number;
  screenContext?: SonarrDetailScreenContext;
  searchContext?: SonarrSearchFilterContext;
  tvdbId?: number;
}) => {
  router.push({
    pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
    params: {
      context: screenContext,
      itemId: searchItemId,
      episodeId: episodeId,
      seasonNumber: seasonNumber,
      tvdbId: tvdbId,
    } as SonarrDetailScreenProps,
  });
};

export const filterSonarrSearchData = <T extends SeriesResource>(
  data: T[],
  searchFilters: Record<string, any> | undefined
) => {
  let filteredData = data;

  if (searchFilters?.["sonarr:status"]) {
    const searchFilter = searchFilters?.["sonarr:status"];
    if (searchFilter.value === "sonarr:monitored") {
      filteredData = filteredData.filter((data) => data.monitored === true);
    } else if (searchFilter.value === "sonarr:unmonitored") {
      filteredData = filteredData.filter((data) => data.monitored === false);
    } else if (searchFilter.value === "sonarr:continuing") {
      filteredData = filteredData.filter(
        (data) => data.status === SeriesStatusType.continuing
      );
    } else if (searchFilter.value === "sonarr:ended") {
      filteredData = filteredData.filter((data) => {
        return data.status === SeriesStatusType.ended;
      });
    } else if (searchFilter.value === "sonarr:missing") {
      filteredData = filteredData.filter(
        (data) => data.statistics?.percentOfEpisodes !== 100
      );
    }
  }

  if (searchFilters?.["sonarr:order"]) {
    const searchFilter = searchFilters?.["sonarr:order"];
    if (searchFilter.value === "sonarr:alphabetical") {
      if (searchFilter.order === FilterOrder.ASCENDING) {
        filteredData = filteredData.sort((a, b) =>
          (a.title as string).localeCompare(b.title as string)
        );
      } else if (searchFilter.order === FilterOrder.DESCENDING) {
        filteredData = filteredData.sort((a, b) =>
          (b.title as string).localeCompare(a.title as string)
        );
      }
    } else if (searchFilter.value === "sonarr:dateAdded") {
      if (searchFilter.order === FilterOrder.ASCENDING) {
        filteredData = filteredData.sort(
          (a, b) =>
            new Date(a.added as string).getTime() -
            new Date(b.added as string).getTime()
        );
      } else if (searchFilter.order === FilterOrder.DESCENDING) {
        filteredData = filteredData.sort(
          (a, b) =>
            new Date(b.added as string).getTime() -
            new Date(a.added as string).getTime()
        );
      }
    } else if (searchFilter.value === "sonarr:size") {
      if (searchFilter.order === FilterOrder.ASCENDING) {
        filteredData = filteredData.sort(
          (a, b) =>
            (a.statistics?.sizeOnDisk as number) -
            (b.statistics?.sizeOnDisk as number)
        );
      } else if (searchFilter.order === FilterOrder.DESCENDING) {
        filteredData = filteredData.sort(
          (a, b) =>
            (b.statistics?.sizeOnDisk as number) -
            (a.statistics?.sizeOnDisk as number)
        );
      }
    } else if (searchFilter.value === "sonarr:nextAiring") {
      if (searchFilter.order === FilterOrder.ASCENDING) {
        filteredData = filteredData.sort(
          (a, b) =>
            new Date(a.nextAiring as string).getTime() -
            new Date(b.nextAiring as string).getTime()
        );
      } else if (searchFilter.order === FilterOrder.DESCENDING) {
        filteredData = filteredData.sort(
          (a, b) =>
            new Date(b.nextAiring as string).getTime() -
            new Date(a.nextAiring as string).getTime()
        );
      }
    } else if (searchFilter.value === "sonarr:episodes") {
      if (searchFilter.order === FilterOrder.ASCENDING) {
        filteredData = filteredData.sort(
          (a, b) =>
            (a.statistics?.episodeFileCount as number) -
            (b.statistics?.episodeFileCount as number)
        );
      } else if (searchFilter.order === FilterOrder.DESCENDING) {
        filteredData = filteredData.sort(
          (a, b) =>
            (b.statistics?.episodeFileCount as number) -
            (a.statistics?.episodeFileCount as number)
        );
      } else if (searchFilter.value === "sonarr:network") {
        if (searchFilter.order === FilterOrder.ASCENDING) {
          filteredData = filteredData.sort((a, b) =>
            (a.network as string).localeCompare(b.network as string)
          );
        } else if (searchFilter.order === FilterOrder.DESCENDING) {
          filteredData = filteredData.sort((a, b) =>
            (b.network as string).localeCompare(a.network as string)
          );
        }
      } else if (searchFilter.value === "sonarr:qualityProfile") {
        if (searchFilter.order === FilterOrder.ASCENDING) {
          filteredData = filteredData.sort(
            (a, b) =>
              (a.qualityProfileId as number) - (b.qualityProfileId as number)
          );
        } else if (searchFilter.order === FilterOrder.DESCENDING) {
          filteredData = filteredData.sort(
            (a, b) =>
              (b.qualityProfileId as number) - (a.qualityProfileId as number)
          );
        }
      } else if (searchFilter.value === "sonarr:type") {
        if (searchFilter.order === FilterOrder.ASCENDING) {
          filteredData = filteredData.sort((a, b) =>
            (a.seriesType as string).localeCompare(b.seriesType as string)
          );
        } else if (searchFilter.order === FilterOrder.DESCENDING) {
          filteredData = filteredData.sort((a, b) =>
            (a.seriesType as string).localeCompare(b.seriesType as string)
          );
        }
      }
    }
  }

  return filteredData;
};

// NOTE: STATISTICS UTILS
export const getSizeOnDisk = (size: number) => {
  const sizeInGB = size / 1073741824;
  return sizeInGB.toFixed(2);
};

// NOTE: DATE UTILS
export const checkEpisodeHasAired = (airDateUtc: string, runtime?: number) => {
  return (
    new Date().getTime() -
      (new Date(airDateUtc).getTime() +
        (runtime ?? 1) * MILLISECONDS_TO_MINUTES_MULTIPLIER) >
    0
  );
};

// export const getStartAndEndOfWeek = (date: Date) => {
//   const day = date.getDay();
//   const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);
//   const startOfWeek = new Date(date.setDate(diffToMonday));

//   // // Reset the date
//   // date = new Date();

//   const diffToSunday = date.getDate() - day + (day === 0 ? 0 : 7);
//   const endOfWeek = new Date(date.setDate(diffToSunday));

//   return

// NOTE: SEARCH ALL MISSING
export const searchAllMissing = () => {
  // id?: number;
  // name?: string | null;
  // commandName?: string | null;
  // message?: string | null;
  // body?: Command;
  // priority?: CommandPriority;
  // status?: CommandStatus;
  // result?: CommandResult;
  // queued?: string;
  // started?: string | null;
  // ended?: string | null;
  // duration?: TimeSpan;
  // exception?: string | null;
  // trigger?: CommandTrigger;
  // clientUserAgent?: string | null;
  // stateChangeTime?: string | null;
  // sendUpdatesToClient?: boolean;
  // updateScheduledTask?: boolean;
  // lastExecutionTime?: string | null;
  postApiV3Command({});
};

// NOTE: VIEW TYPE
export const SONARR_SUPPORTED_VIEW_TYPES = [ViewType.Grid, ViewType.List];
