import React from "react";
import { LayoutAnimation } from "react-native";

import { create_axios_instance } from "@astrysk/api";
import * as DeviceInfo from "expo-device";
import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import { useLidarrStore } from "./store";

import {
  registerLoadingComponent,
  unregisterLoadingComponent,
} from "@astrysk/components";
import { Actions, Screens } from "@astrysk/constants";
import { FilterOrder, Router, TabContext } from "@astrysk/types";
import {
  LidarrDetailScreenContext,
  LidarrDetailScreenProps,
  LidarrSearchFilterContext,
} from "./types";
import {
  CommandResource,
  HistoryResource,
  // MovieResource,
  // MovieStatusType,
  // postApiV3Command,
} from "./api";
import { useColorScheme } from "@astrysk/utils";
import { FlashList } from "@shopify/flash-list";

// NOTE: LOGIN / AUTHENTICATION / CONFIGURE
export const configureAxiosForLidarr = (
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
export const configureLidarr = () => {
  const isConfigured = useLidarrStore.getState().isConfigured;

  // Check if token and baseURL exists
  const baseURL = useLidarrStore.getState().baseURL;
  const token = useLidarrStore.getState().token;
  const customHeaders = useLidarrStore.getState().customHeaders;

  if (!baseURL) {
    return false;
  }

  if (isConfigured) {
    return true;
  }

  configureAxiosForLidarr(baseURL, token, customHeaders);

  useLidarrStore.setState({ isConfigured: true });

  return true;
};

export const useLidarrConfigurator = () => {
  return React.useEffect(() => {
    configureLidarr();
  }, []);
};

export const deConfigureLidarr = () => {
  useLidarrStore.setState({ isConfigured: false });
};

// NOTE: SEARCH / COLLECTION UTILS
export const goToLidarrDetailScreen = ({
  router,
  searchItemId,
  tabContext,
  screenContext,
  searchContext,
}: {
  router: Router;
  searchItemId: number;
  tabContext: TabContext;
  screenContext?: LidarrDetailScreenContext;
  searchContext?: LidarrSearchFilterContext;
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
    } as LidarrDetailScreenProps,
  });
};

export const goToLidarrModalScreen = ({
  router,
  searchItemId,
  episodeId,
  seasonNumber,
  screenContext,
  searchContext,
  imdbId,
  tmdbId,
}: {
  router: Router;
  searchItemId: number;
  episodeId?: number;
  seasonNumber?: number;
  screenContext?: LidarrDetailScreenContext;
  searchContext?: LidarrSearchFilterContext;
  imdbId?: string;
  tmdbId?: number;
}) => {
  router.push({
    pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
    params: {
      context: screenContext,
      itemId: searchItemId,
      episodeId: episodeId,
      seasonNumber: seasonNumber,
      imdbId: imdbId,
      tmdbId: tmdbId,
    } as LidarrDetailScreenProps,
  });
};

// export const filterLidarrSearchData = <T extends MovieResource>(
//   data: T[],
//   searchFilters: Record<string, any> | undefined
// ) => {
//   let filteredData = data;
//
//   if (searchFilters?.["radarr:status"]) {
//     const searchFilter = searchFilters?.["radarr:status"];
//     if (searchFilter.value === "radarr:monitored") {
//       filteredData = filteredData.filter((data) => data.monitored === true);
//     } else if (searchFilter.value === "radarr:unmonitored") {
//       filteredData = filteredData.filter((data) => data.monitored === false);
//     } else if (searchFilter.value === "radarr:missing") {
//       filteredData = filteredData.filter((data) => data.hasFile === false);
//     } else if (searchFilter.value === "radarr:wanted") {
//       filteredData = filteredData.filter(
//         (data) => data.monitored && data.hasFile === false
//       );
//     }
//     // else if (searchFilter.value === "radarr:cutOffUnmet") {
//     //   filteredData = filteredData.filter(
//     //     (data) => data.statistics?.percentOfEpisodes !== 100
//     //   );
//     // }
//   }
//
//   if (searchFilters?.["radarr:order"]) {
//     const searchFilter = searchFilters?.["radarr:order"];
//     if (searchFilter.value === "radarr:alphabetical") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort((a, b) =>
//           (a.title as string).localeCompare(b.title as string)
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort((a, b) =>
//           (b.title as string).localeCompare(a.title as string)
//         );
//       }
//     } else if (searchFilter.value === "radarr:dateAdded") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             new Date(a.added as string).getTime() -
//             new Date(b.added as string).getTime()
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             new Date(b.added as string).getTime() -
//             new Date(a.added as string).getTime()
//         );
//       }
//     } else if (searchFilter.value === "radarr:digitalRelease") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             new Date(a.digitalRelease as string).getTime() -
//             new Date(b.digitalRelease as string).getTime()
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             new Date(b.digitalRelease as string).getTime() -
//             new Date(a.digitalRelease as string).getTime()
//         );
//       }
//     } else if (searchFilter.value === "radarr:physicalRelease") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             new Date(a.physicalRelease as string).getTime() -
//             new Date(b.physicalRelease as string).getTime()
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             new Date(b.physicalRelease as string).getTime() -
//             new Date(a.physicalRelease as string).getTime()
//         );
//       }
//     } else if (searchFilter.value === "radarr:inCinemas") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             new Date(a.inCinemas as string).getTime() -
//             new Date(b.inCinemas as string).getTime()
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             new Date(b.inCinemas as string).getTime() -
//             new Date(a.inCinemas as string).getTime()
//         );
//       }
//     } else if (searchFilter.value === "radarr:size") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) => (a.sizeOnDisk as number) - (b.sizeOnDisk as number)
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) => (b.sizeOnDisk as number) - (a.sizeOnDisk as number)
//         );
//       }
//     } else if (searchFilter.value === "radarr:studio") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort((a, b) =>
//           (a.studio as string).localeCompare(b.studio as string)
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort((a, b) =>
//           (b.studio as string).localeCompare(a.studio as string)
//         );
//       }
//     } else if (searchFilter.value === "radarr:year") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) => (a.year as number) - (b.year as number)
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) => (b.year as number) - (a.year as number)
//         );
//       }
//     } else if (searchFilter.value === "radarr:runtime") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) => (a.runtime as number) - (b.runtime as number)
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) => (b.runtime as number) - (a.runtime as number)
//         );
//       }
//     } else if (searchFilter.value === "radarr:minimumAvailability") {
//       const minimumAvailabilitySortOrder = {
//         [MovieStatusType.announced]: 0,
//         [MovieStatusType.released]: 1,
//         [MovieStatusType.inCinemas]: 2,
//         [MovieStatusType.deleted]: 3,
//         [MovieStatusType.tba]: 4,
//       };
//
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             minimumAvailabilitySortOrder[a.status as MovieStatusType] -
//             minimumAvailabilitySortOrder[b.status as MovieStatusType]
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             minimumAvailabilitySortOrder[b.status as MovieStatusType] -
//             minimumAvailabilitySortOrder[a.status as MovieStatusType]
//         );
//       }
//     } else if (searchFilter.value === "radarr:qualityProfile") {
//       if (searchFilter.order === FilterOrder.ASCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             (a.qualityProfileId as number) - (b.qualityProfileId as number)
//         );
//       } else if (searchFilter.order === FilterOrder.DESCENDING) {
//         filteredData = filteredData.sort(
//           (a, b) =>
//             (b.qualityProfileId as number) - (a.qualityProfileId as number)
//         );
//       }
//     }
//   }
//
//   return filteredData;
// };

// NOTE: STATISTICS UTILS
export const getSizeOnDisk = (size: number) => {
  const sizeInGB = size / 1073741824;
  return sizeInGB.toFixed(2);
};
