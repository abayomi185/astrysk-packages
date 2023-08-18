import React from "react";
import { Alert } from "react-native";
import { ToastPosition } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import { Button, GetProps, XStack, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import {
  EpisodeFileListResource,
  EpisodeResource,
  SeasonResource,
  SeriesResource,
  useDeleteApiV3EpisodefileBulk,
  useDeleteApiV3EpisodefileId,
  useDeleteApiV3SeriesId,
  usePostApiV3Command,
  usePostApiV3Release,
  usePutApiV3EpisodeId,
  usePutApiV3SeriesId,
} from "../../api";
import { toast } from "@backpackapp-io/react-native-toast";
import { useSonarrStore } from "../../store";
import { useTranslation } from "react-i18next";
import { getSonarrIconColor, goToSonarrModalScreen } from "../../utils";
import { TabContext } from "@astrysk/types";
import {
  SonarrDetailScreenContext,
  SonarrCommands,
  ExtendedSeriesResource,
  ToastModalProviderKey,
} from "../../types";
import { TFunction } from "i18next";

export const sonarrActionButtonColors = {
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

// NOTE: Need to completed this component
export const SonarrEpisodeItemActionPanel: React.FC<{
  t: TFunction;
  data: EpisodeResource;
}> = ({ t, data }) => {
  const iconColor = getSonarrIconColor();

  // NOTE: AUTOMATIC SEARCH
  const postCommand = usePostApiV3Command({
    mutation: {
      onSuccess: () => {
        toast.success(t("sonarr:success:automaticSearchStarted"), {
          providerKey: ToastModalProviderKey.Persists,
        });
      },
      onError: (error) => {
        toast.error(t("sonarr:error:automaticSearchFailed)"), {
          providerKey: ToastModalProviderKey.Persists,
        });
        toast.error(error.message, {
          providerKey: ToastModalProviderKey.Persists,
        });
      },
    },
  });
  const postCommandAction = () => {
    postCommand.mutate({
      data: {
        name: SonarrCommands.EPISODE_SEARCH,
        // @ts-ignore
        episodeIds: [data?.id as number],
      },
    });
  };

  return (
    <YStack flex={1} justifyContent="center" alignItems="center">
      {/* NOTE: AUTOMATIC SEARCH */}
      <SonarrActionPanelButton first vertical onPress={postCommandAction}>
        <Ionicons name="ios-search" size={23} color={iconColor} />
      </SonarrActionPanelButton>
    </YStack>
  );
};

export const SonarrEpisodeActionPanel: React.FC<{
  data: EpisodeResource;
  refetchEpisodeData?: () => void;
}> = ({ data, refetchEpisodeData }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const iconColor = getSonarrIconColor();

  const monitoredStatus = useSonarrStore(
    (state) =>
      state.sonarrEpisodeCache?.[data.seriesId as number]?.[data.id as number]
        ?.monitored
  );

  // NOTE: MONITORING
  const putEpisode = usePutApiV3EpisodeId({
    mutation: {
      onSuccess: (data) => {
        useSonarrStore.setState((state) => {
          return {
            sonarrEpisodeCache: {
              ...state.sonarrEpisodeCache,
              [data.seriesId as number]: {
                [data.id as number]: data,
              },
            },
          };
        });
      },
    },
  });
  const toggleMonitor = () => {
    putEpisode.mutate({
      id: data?.id as number,
      data: {
        ...data,
        monitored: !monitoredStatus,
      },
    });
  };

  // NOTE: AUTOMATIC SEARCH
  const postCommand = usePostApiV3Command({
    mutation: {
      onSuccess: () => {
        toast.success(t("sonarr:success:automaticSearchStarted"), {
          providerKey: ToastModalProviderKey.Persists,
        });
      },
      onError: (error) => {
        toast.error(t("sonarr:error:automaticSearchFailed)"), {
          providerKey: ToastModalProviderKey.Persists,
        });
        toast.error(error.message, {
          providerKey: ToastModalProviderKey.Persists,
        });
      },
    },
  });
  const postCommandAction = () => {
    postCommand.mutate({
      data: {
        name: SonarrCommands.EPISODE_SEARCH,
        // @ts-ignore
        episodeIds: [data?.id as number],
      },
    });
  };

  // NOTE: DELETING
  const deleteEpisode = useDeleteApiV3EpisodefileId({
    mutation: {
      onSuccess: () => {
        useSonarrStore.setState((state) => {
          if (state.sonarrEpisodeFileCache) {
            const { [data.episodeFileId as number]: _, ...newState } =
              state.sonarrEpisodeFileCache;
            return { sonarrEpisodeFileCache: newState };
          }
          return state; // return the current state if sonarrEpisodeFileCache is undefined
        });
        refetchEpisodeData?.();
      },
    },
  });
  const deleteEpisodeFile = () => {
    Alert.alert(
      `${t("common:areYouSure")}`,
      `${t("common:thisWillDelete")} - ${t("sonarr:episode")} ${
        data.episodeNumber
      } - ${data.title}`,
      [
        {
          text: `${t("common:cancel")}`,
          style: "default",
        },
        {
          text: `${t("common:ok")}`,
          onPress: () => {
            deleteEpisode.mutate({
              id: data?.episodeFileId as number,
            });
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <XStack flex={1} justifyContent="center" alignItems="center">
      <SonarrActionPanelButton
        first
        style={{
          ...sonarrActionButtonColors.monitoring,
          backgroundColor: monitoredStatus ? "$red7" : "$gray5",
        }}
        onPress={toggleMonitor}
      >
        <Ionicons name="ios-bookmark" size={23} color={iconColor} />
      </SonarrActionPanelButton>
      <SonarrActionPanelButton
        style={sonarrActionButtonColors.automaticSearch}
        onPress={postCommandAction}
      >
        <Ionicons name="ios-search" size={23} color={iconColor} />
      </SonarrActionPanelButton>
      <SonarrActionPanelButton
        style={sonarrActionButtonColors.interactiveSearch}
        onPress={() =>
          goToSonarrModalScreen({
            router,
            searchItemId: data.seriesId as number,
            screenContext: SonarrDetailScreenContext.InteractiveSearch,
            episodeId: data.id as number,
          })
        }
      >
        <Ionicons name="person" size={23} color={iconColor} />
      </SonarrActionPanelButton>
      <SonarrActionPanelButton
        style={sonarrActionButtonColors.delete}
        onPress={deleteEpisodeFile}
      >
        <Ionicons name="trash-bin-sharp" size={23} color={iconColor} />
      </SonarrActionPanelButton>
    </XStack>
  );
};

export const SonarrActionPanel: React.FC<{
  data: ExtendedSeriesResource;
  isSeries?: boolean;
  seasonNumber?: number;
  refetchSeasons?: () => void;
}> = ({ data, isSeries, seasonNumber, refetchSeasons }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const iconColor = getSonarrIconColor();

  const monitoredStatus = useSonarrStore(
    (state) => state.sonarrSeriesCache?.[data.id as number]?.monitored
  );

  const seasonData = useSonarrStore((state) =>
    state.sonarrSeriesCache?.[data.id as number]?.seasons?.find(
      (season) => season.seasonNumber === seasonNumber
    )
  );

  const episodesInSeries =
    useSonarrStore.getState().sonarrEpisodeCache?.[data.id as number];

  // NOTE: MONITORING
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
        toast.success(t("sonarr:success:monitoringStatusUpdated"), {
          providerKey: ToastModalProviderKey.Persists,
        });
      },
      onError: (error) => {
        toast.error(t("sonarr:error:unableToSetMonitoredStatus"), {
          providerKey: ToastModalProviderKey.Persists,
        });
        toast.error(error.message, {
          providerKey: ToastModalProviderKey.Persists,
        });
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
    refetchSeasons?.();
  };

  // NOTE: DELETE
  const deleteSeries = useDeleteApiV3SeriesId();
  const deleteEpisodes = useDeleteApiV3EpisodefileBulk({
    mutation: {
      onSuccess: () => {
        refetchSeasons?.();
      },
    },
  });
  const getEpisodeIdsForSeasonDeletion = (seasonNumber: number) => {
    if (episodesInSeries) {
      return Object.keys(episodesInSeries)
        .filter(
          (key: any) =>
            episodesInSeries[Number(key)].seasonNumber === seasonNumber
        )
        .map((key: any) => episodesInSeries[Number(key)].episodeFileId)
        .filter((val) => val !== 0);
    }
    return [];
  };

  const deleteAction = (deleteFiles: boolean = true) => {
    Alert.alert(
      `${t("sonarr:doYouWantToDelete")}`,
      `${isSeries ? t("sonarr:series") : t("sonarr:season")}${
        !isSeries ? " " + seasonNumber : ""
      } ` +
        `- ${data.title}\n` +
        `${t("sonarr:thisHas")} ` +
        `${getEpisodeIdsForSeasonDeletion(seasonNumber as number).length} ${t(
          "sonarr:episodes"
        )}`,
      [
        {
          text: `${t("common:cancel")}`,
          style: "default",
        },
        {
          text: `${t("common:ok")}`,
          onPress: () => {
            isSeries
              ? deleteSeries.mutate({
                  id: data.id as number,
                  params: {
                    ...(deleteFiles ? { deleteFiles: deleteFiles } : {}),
                  },
                })
              : () => {
                  const episodeCount = getEpisodeIdsForSeasonDeletion(
                    seasonNumber as number
                  );
                  if (episodeCount && episodeCount.length > 0) {
                    deleteEpisodes.mutate({
                      data: {
                        episodeFileIds: episodeCount,
                        deleteFiles: true,
                      } as EpisodeFileListResource,
                    });
                  }
                };
          },
          style: "destructive",
        },
      ]
    );
  };

  // NOTE: AUTOMATIC SEARCH
  const postCommand = usePostApiV3Command({
    mutation: {
      onSuccess: () => {
        toast.success(t("sonarr:success:automaticSearchStarted"), {
          providerKey: ToastModalProviderKey.Persists,
        });
      },
      onError: (error) => {
        toast.error(t("sonarr:error:automaticSearchFailed)"), {
          providerKey: ToastModalProviderKey.Persists,
        });
        toast.error(error.message, {
          providerKey: ToastModalProviderKey.Persists,
        });
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
          onPress={() => postCommandAction()}
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
        <SonarrActionPanelButton
          style={sonarrActionButtonColors.delete}
          onPress={deleteAction}
        >
          <Ionicons name="trash-bin-sharp" size={23} color={iconColor} />
        </SonarrActionPanelButton>
      </XStack>
    </XStack>
  );
};
