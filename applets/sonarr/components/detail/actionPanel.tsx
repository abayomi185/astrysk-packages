import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button, GetProps, XStack, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import {
  EpisodeResource,
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

const sonarrActionButtonColors = {
  monitoring: {
    borderColor: "$red7",
    borderWidth: "$1.5",
  },
  edit: {
    backgroundColor: "$green7",
    borderColor: "$green7",
    borderWidth: "$1",
  },
  automaticSearch: {
    backgroundColor: "$blue7",
    borderColor: "$blue7",
    borderWidth: "$1",
  },
  interactiveSearch: {
    backgroundColor: "$purple7",
    borderColor: "$purple7",
    borderWidth: "$1",
  },
  history: {
    backgroundColor: "$orange7",
    borderColor: "$orange7",
    borderWidth: "$1",
  },
  delete: {
    backgroundColor: "$gray7",
    borderColor: "$gray7",
    borderWidth: "$1",
  },
};

export const SonarrActionPanelButton: React.FC<{
  children: React.ReactNode;
  onPress?: () => void;
  style?: GetProps<typeof Button>;
  first?: boolean;
  vertical?: boolean;
}> = ({ children, onPress, style, first, vertical }) => {
  return (
    <Button
      width="$5"
      marginLeft={first || vertical ? undefined : "$2"}
      marginTop={!first && vertical ? "$3" : undefined}
      padding="$0"
      backgroundColor="$gray1"
      {...style}
      onPress={onPress}
    >
      {children}
    </Button>
  );
};

export const SonarrEpisodeItemActionPanel: React.FC<{
  data: EpisodeResource;
}> = ({ data }) => {
  const iconColor = useColorScheme() === "dark" ? "#d9d9d9" : "#000000";

  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      {/* NOTE: Monitoring */}
      <SonarrActionPanelButton
        first
        vertical
        // onPress={toggleMonitor}
      >
        <Ionicons name="ios-search" size={23} color={iconColor} />
      </SonarrActionPanelButton>
    </YStack>
  );
};

export const SonarrEpisodeActionPanel: React.FC<{
  data: EpisodeResource;
}> = ({ data }) => {
  const iconColor = useColorScheme() === "dark" ? "#d9d9d9" : "#000000";

  return (
    <XStack flex={1} justifyContent="center" alignItems="center">
      {/* NOTE: Monitoring */}
      <SonarrActionPanelButton
        first
        style={sonarrActionButtonColors.automaticSearch}
        // onPress={toggleMonitor}
      >
        <Ionicons name="ios-search" size={23} color={iconColor} />
      </SonarrActionPanelButton>
      <SonarrActionPanelButton
        style={sonarrActionButtonColors.interactiveSearch}
        // onPress={toggleMonitor}
      >
        <Ionicons name="person" size={23} color={iconColor} />
      </SonarrActionPanelButton>
    </XStack>
  );
};

export const SonarrActionPanel: React.FC<{
  data: ExtendedSeriesResource;
  isSeries?: boolean;
  seasonNumber?: number;
  // parentIndexNumber?: number;
  // indexNumber: number;
  // hasBeenWatched?: boolean;
  // setWatchedStatus: () => void;
  // playEpisode: () => void;
  // moreDetails: () => void;
}> = ({ data, isSeries, seasonNumber }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const baseURL = useSonarrStore.getState().baseURL as string;

  const iconColor = useColorScheme() === "dark" ? "#d9d9d9" : "#000000";

  const monitoredStatus = useSonarrStore(
    (state) => state.sonarrSeriesCache?.[data.id as number]?.monitored
  );

  const seasonData = useSonarrStore((state) =>
    state.sonarrSeriesCache?.[data.id as number].seasons?.find(
      (season) => season.seasonNumber === seasonNumber
    )
  );

  // NOTE: Put Series
  const putSeries = usePutApiV3SeriesId({
    mutation: {
      onSuccess: (data) => {
        useSonarrStore.setState((state) => {
          return {
            sonarrSeriesCache: {
              ...state.sonarrSeriesCache,
              [data.id as number]: data,
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
    const { sonarrContext, sonarrTabContext, sonarrSeasonNumber, ...newData } =
      data;
    // Check if season number exists
    if (seasonNumber !== undefined) {
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
    } else {
      // Season
      putSeries.mutate({
        id: (newData.id as number).toString(),
        data: {
          ...newData,
          monitored: !monitoredStatus,
        },
      });
    }
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
  const postCommandAction = () => {
    const commandName = isSeries
      ? SonarrCommands.SERIES_SEARCH
      : SonarrCommands.SEASON_SEARCH;
    postCommand.mutate({
      data: {
        name: commandName, // Not commandName
        ...(isSeries ? { id: data.id as number } : {}),
        ...(seasonNumber !== undefined
          ? {
              seriesId: data.id as number,
              seasonNumber: seasonNumber,
            }
          : {}),
      },
    });
  };

  return (
    <XStack justifyContent="center">
      <XStack flex={1} height="$4" width="100%" justifyContent="center">
        {/* NOTE: Monitoring */}
        <SonarrActionPanelButton
          first
          style={{
            ...sonarrActionButtonColors.monitoring,
            backgroundColor:
              seasonNumber !== undefined
                ? seasonData?.monitored
                  ? "$red7"
                  : "$gray5"
                : monitoredStatus
                ? "$red7"
                : "$gray5",
          }}
          onPress={toggleMonitor}
        >
          <Ionicons name="ios-bookmark" size={23} color={iconColor} />
        </SonarrActionPanelButton>
        {/* NOTE: Edit */}
        {isSeries && (
          <SonarrActionPanelButton
            style={sonarrActionButtonColors.edit}
            onPress={() => {
              goToSonarrModalScreen({
                router,
                searchItemId: data.id as number,
                screenContext: SonarrDetailScreenContext.EditSeries,
                seasonNumber: seasonNumber,
              });
            }}
          >
            <Ionicons name="brush" size={23} color={iconColor} />
          </SonarrActionPanelButton>
        )}
        {/* NOTE: Automatic Search */}
        <SonarrActionPanelButton
          style={sonarrActionButtonColors.automaticSearch}
          // onPress={() => postCommandAction(SonarrCommands.SERIES_SEARCH)}
        >
          <Ionicons name="ios-search" size={23} color={iconColor} />
        </SonarrActionPanelButton>
        {/* NOTE: Interactive Search */}
        <SonarrActionPanelButton
          style={sonarrActionButtonColors.interactiveSearch}
          onPress={() =>
            goToSonarrModalScreen({
              router,
              searchItemId: data.id as number,
              screenContext: SonarrDetailScreenContext.InteractiveSearch,
              seasonNumber: seasonNumber,
            })
          }
        >
          <Ionicons name="person" size={23} color={iconColor} />
        </SonarrActionPanelButton>
        {/* NOTE: History */}
        <SonarrActionPanelButton
          style={sonarrActionButtonColors.history}
          onPress={() =>
            goToSonarrModalScreen({
              router,
              searchItemId: data.id as number,
              screenContext: SonarrDetailScreenContext.History,
              seasonNumber: seasonNumber,
            })
          }
        >
          <Ionicons name="time" size={23} color={iconColor} />
        </SonarrActionPanelButton>
        {/* NOTE: Delete */}
        {isSeries && (
          <SonarrActionPanelButton
            style={sonarrActionButtonColors.delete}
            onPress={() => {
              Alert.alert(
                `${t("common:areYouSure")}`,
                `${t("common:thisWillDelete")} - ${data.title}`,
                [
                  {
                    text: `${t("common:cancel")}`,
                    style: "default",
                  },
                  {
                    text: `${t("common:ok")}`,
                    onPress: () => {},
                    style: "destructive",
                  },
                ]
              );
            }}
          >
            <Ionicons name="trash-bin-sharp" size={23} color={iconColor} />
          </SonarrActionPanelButton>
        )}
      </XStack>
    </XStack>
  );
};
