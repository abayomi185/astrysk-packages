import React from "react";
import { useRouter } from "expo-router";
import { Button, GetProps, XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import {
  SeasonResource,
  SeriesResource,
  useDeleteApiV3SeriesId,
  usePostApiV3Command,
  usePutApiV3SeriesId,
} from "../../api";
import { toast } from "@backpackapp-io/react-native-toast";
import { useSonarrStore } from "../../store";
import { useTranslation } from "react-i18next";
import { goToSonarrModalScreen } from "../../utils";
import { TabContext } from "@astrysk/types";
import {
  SonarrDetailScreenContext,
  SonarrCommands,
  ExtendedSeriesResource,
} from "../../types";
import { useColorScheme } from "@astrysk/utils";

const SonarrActionPanelButton: React.FC<{
  children: React.ReactNode;
  onPress?: () => void;
  style?: GetProps<typeof Button>;
  first?: boolean;
}> = ({ children, onPress, style, first }) => {
  return (
    <Button
      width="$5"
      marginLeft={first ? undefined : "$2"}
      padding="$0"
      // backgroundColor="$gray5"
      backgroundColor="$gray1"
      {...style}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export const SonarrSeriesActionPanel: React.FC<{
  data: ExtendedSeriesResource;
  // parentIndexNumber?: number;
  // indexNumber: number;
  // hasBeenWatched?: boolean;
  // setWatchedStatus: () => void;
  // playEpisode: () => void;
  // moreDetails: () => void;
}> = ({ data }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const baseURL = useSonarrStore.getState().baseURL as string;

  const iconColor = useColorScheme() === "dark" ? "#d9d9d9" : "#000000";

  const monitoredStatus = useSonarrStore(
    (state) => state.sonarrCache?.[baseURL]?.[data.id as number]?.monitored
  );

  // NOTE: Put Series
  const putSeries = usePutApiV3SeriesId({
    mutation: {
      onSuccess: (data) => {
        useSonarrStore.setState((state) => {
          return {
            sonarrCache: {
              ...state.sonarrCache,
              [baseURL]: {
                ...state.sonarrCache?.[baseURL],
                [data.id as number]: data,
              },
            },
          };
        });
        toast.success(t("sonarr:success:monitoringStatusUpdated"));
      },
      onError: (error) => {
        toast.error(t("sonarr:error:unableToSetMonitoredStatus"));
        toast.error(error.message);
      },
    },
  });
  const toggleMonitor = () => {
    const { sonarrContext, sonarrTabContext, ...newData } = data;
    putSeries.mutate({
      id: (newData.id as number).toString(),
      data: {
        ...newData,
        monitored: !monitoredStatus,
      },
    });
  };

  const deleteSeries = useDeleteApiV3SeriesId();
  const deleteSeriesAction = (deleteFiles?: boolean) => {
    deleteSeries.mutate({
      id: data.id as number,
      params: {
        ...(deleteFiles ? { deleteFiles: deleteFiles } : {}),
      },
    });
  };

  // NOTE: Post Command
  const postCommand = usePostApiV3Command({
    mutation: {
      onSuccess: () => {
        toast.success(t("sonarr:success:automaticSearchStarted"));
      },
      onError: (error) => {
        toast.error(t("sonarr:error:automaticSearchFailed)"));
        toast.error(error.message);
      },
    },
  });
  const postCommandAction = (commandName: string) => {
    postCommand.mutate({
      data: {
        id: data.id as number,
        name: commandName, // Not commandName
      },
    });
  };

  return (
    <XStack justifyContent="center">
      <XStack
        flex={1}
        height="$4"
        width="100%"
        marginTop="$5"
        justifyContent="center"
      >
        {/* NOTE: Monitoring */}
        <SonarrActionPanelButton
          first
          style={{
            backgroundColor: monitoredStatus ? "$red7" : "$gray5",
            borderColor: "$red7",
            borderWidth: "$1.5",
          }}
          onPress={toggleMonitor}
        >
          <Ionicons name="ios-bookmark" size={23} color={iconColor} />
        </SonarrActionPanelButton>
        {/* NOTE: Edit */}
        <SonarrActionPanelButton
          style={{
            backgroundColor: "$green7",
            borderColor: "$green7",
            borderWidth: "$1",
          }}
          onPress={() => {
            goToSonarrModalScreen({
              router,
              searchItemId: data.id as number,
              tabContext: TabContext.Search,
              screenContext: SonarrDetailScreenContext.EditSeries,
            });
          }}
        >
          <Ionicons name="brush" size={23} color={iconColor} />
        </SonarrActionPanelButton>
        {/* NOTE: Automatic Search */}
        <SonarrActionPanelButton
          style={{
            backgroundColor: "$blue7",
            borderColor: "$blue7",
            borderWidth: "$1",
          }}
          // onPress={() => postCommandAction(SonarrCommands.SERIES_SEARCH)}
        >
          <Ionicons name="ios-search" size={23} color={iconColor} />
        </SonarrActionPanelButton>
        {/* NOTE: Interactive Search */}
        <SonarrActionPanelButton
          style={{
            backgroundColor: "$purple7",
            borderColor: "$purple7",
            borderWidth: "$1",
          }}
          onPress={() =>
            goToSonarrModalScreen({
              router,
              searchItemId: data.id as number,
              tabContext: TabContext.Search,
              screenContext: SonarrDetailScreenContext.InteractiveSearch,
            })
          }
        >
          <Ionicons name="person" size={23} color={iconColor} />
        </SonarrActionPanelButton>
        {/* NOTE: History */}
        <SonarrActionPanelButton
          style={{
            backgroundColor: "$orange7",
            borderColor: "$orange7",
            borderWidth: "$1",
          }}
          onPress={() =>
            goToSonarrModalScreen({
              router,
              searchItemId: data.id as number,
              tabContext: TabContext.Search,
              screenContext: SonarrDetailScreenContext.InteractiveSearch,
            })
          }
        >
          <Ionicons name="time" size={23} color={iconColor} />
        </SonarrActionPanelButton>
        {/* NOTE: Delete */}
        <SonarrActionPanelButton
          style={{
            backgroundColor: "$gray7",
            borderColor: "$gray7",
            borderWidth: "$1",
          }}
          onPress={() => {}}
        >
          <Ionicons name="trash-bin-sharp" size={23} color={iconColor} />
        </SonarrActionPanelButton>
      </XStack>
    </XStack>
  );
};

export const SonarrSeasonActionPanel: React.FC<{
  data: ExtendedSeriesResource;
  seasonNumber: number;
}> = ({ data, seasonNumber }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const baseURL = useSonarrStore.getState().baseURL as string;
  const iconColor = useColorScheme() === "dark" ? "#d9d9d9" : "#000000";

  const seasonData = useSonarrStore((state) =>
    state.sonarrCache?.[baseURL]?.[data.id as number].seasons?.find(
      (season) => season.seasonNumber === seasonNumber
    )
  );

  // NOTE: Put Series
  const putSeries = usePutApiV3SeriesId({
    mutation: {
      onSuccess: (data) => {
        useSonarrStore.setState((state) => {
          return {
            sonarrCache: {
              ...state.sonarrCache,
              [baseURL]: {
                ...state.sonarrCache?.[baseURL],
                [data.id as number]: data,
              },
            },
          };
        });
        toast.success(t("sonarr:success:monitoringStatusUpdated"));
      },
      onError: (error) => {
        toast.error(t("sonarr:error:unableToSetMonitoredStatus"));
        toast.error(error.message);
      },
    },
  });
  const toggleMonitor = (seasonNumber: number) => {
    const { sonarrContext, sonarrTabContext, ...newData } = data;
    putSeries.mutate({
      id: (newData.id as number).toString(),
      data: {
        ...newData,
        seasons: [
          ...(newData.seasons as SeasonResource[]).map((season) => {
            if (season.seasonNumber === seasonNumber) {
              return {
                ...season,
                monitored: !seasonData?.monitored,
              };
            }
            return season;
          }),
        ],
      },
    });
  };

  // NOTE: Post Command
  const postCommand = usePostApiV3Command({
    mutation: {
      onSuccess: () => {
        toast.success(t("sonarr:success:automaticSearchStarted"));
      },
      onError: (error) => {
        toast.error(t("sonarr:error:automaticSearchFailed)"));
        toast.error(error.message);
      },
    },
  });
  const postCommandAction = (commandName: string) => {
    postCommand.mutate({
      data: {
        name: commandName, // Not commandName
        // @ts-ignore
        seriesId: data.id as number,
        seasonNumber: seasonNumber,
      },
    });
  };

  return (
    <XStack height="$3" justifyContent="center">
      {/* NOTE: Monitoring */}
      <SonarrActionPanelButton
        first
        style={{
          backgroundColor: seasonData?.monitored ? "$red7" : "$gray5",
          borderColor: "$red7",
          borderWidth: "$1.5",
        }}
        onPress={() => toggleMonitor(seasonNumber)}
      >
        <Ionicons name="ios-bookmark" size={23} color={iconColor} />
      </SonarrActionPanelButton>
      {/* NOTE: Automatic Search */}
      <SonarrActionPanelButton
        style={{
          backgroundColor: "$blue6",
          borderColor: "$blue6",
          borderWidth: "$1",
        }}
        // onPress={() => postCommandAction(SonarrCommands.SEASON_SEARCH)}
      >
        <Ionicons name="ios-search" size={23} color={iconColor} />
      </SonarrActionPanelButton>
      {/* NOTE: Interactive Search */}
      <SonarrActionPanelButton
        style={{
          backgroundColor: "$purple6",
          borderColor: "$purple6",
          borderWidth: "$1",
        }}
        onPress={() => {
          goToSonarrModalScreen({
            router,
            searchItemId: data.id as number,
            tabContext: TabContext.Search,
            screenContext: SonarrDetailScreenContext.SeasonInteractiveSearch,
          });
        }}
      >
        <Ionicons name="person" size={23} color={iconColor} />
      </SonarrActionPanelButton>
      {/* NOTE: History */}
      <SonarrActionPanelButton
        style={{
          backgroundColor: "$orange6",
          borderColor: "$orange6",
          borderWidth: "$1",
        }}
        onPress={() => {
          goToSonarrModalScreen({
            router,
            searchItemId: data.id as number,
            tabContext: TabContext.Search,
            screenContext: SonarrDetailScreenContext.SeasonHistory,
          });
        }}
      >
        <Ionicons name="time" size={23} color={iconColor} />
      </SonarrActionPanelButton>
      {/* NOTE: Episodes */}
      {/* <SonarrActionPanelButton */}
      {/*   style={{ */}
      {/*     backgroundColor: "$pink6", */}
      {/*     borderColor: "$pink6", */}
      {/*     borderWidth: "$1", */}
      {/*   }} */}
      {/*   onPress={() => { */}
      {/*     goToSonarrModalScreen({ */}
      {/*       router, */}
      {/*       searchItemId: data.id as number, */}
      {/*       tabContext: TabContext.Search, */}
      {/*       screenContext: SonarrDetailScreenContext.EpisodesList, */}
      {/*     }); */}
      {/*   }} */}
      {/* > */}
      {/*   <Ionicons name="list" size={23} color={iconColor} /> */}
      {/* </SonarrActionPanelButton> */}
    </XStack>
  );
};
