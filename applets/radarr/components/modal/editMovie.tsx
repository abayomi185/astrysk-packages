import React from "react";
import { useNavigation } from "expo-router";
import { Alert, AlertButton } from "react-native";
import {
  QualityProfileResource,
  MovieResource,
  usePostApiV3Movie,
  usePutApiV3MovieId,
  MovieStatusType,
  useGetApiV3MovieLookupImdb,
  useGetApiV3MovieLookupTmdb,
} from "../../api";
import { useRadarrStore } from "../../store";
import { TFunction } from "i18next";
import { SettingsOptionProps } from "@astrysk/types";
import { RadarrDetailScreenContext } from "../../types";
import { Button, XStack, YStack, Text, Spinner } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { SectionTitle, SettingsOption, showToast } from "@astrysk/components";
import { Plus, Pencil } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useQueryEvents } from "@astrysk/utils";

const getRadarrEditDetailOptions = (
  t: TFunction,
  movieData: MovieResource,
  qualityProfiles: QualityProfileResource[],
  rootFolders: string[],
  setState: (value: Partial<MovieResource>) => void
): SettingsOptionProps[] => {
  return [
    {
      key: "monitored",
      name: t("radarr:monitoring") as string,
      type: "toggle",
      setState: setState,
      initialToggleState: movieData?.monitored as boolean,
      firstItem: true,
    },
    {
      key: "radarr:minimumAvailability",
      type: "action",
      selectionHint: t(`radarr:${movieData?.minimumAvailability}`) as string,
      onPress: () => {
        const selectMovieMinimumAvailability = (
          status: MovieResource["minimumAvailability"]
        ) => {
          setState({
            minimumAvailability: status,
          });
        };
        Alert.alert(
          t("radarr:minimumAvailability"),
          t("radarr:chooseTheMinimumAvailability") as string,
          [
            {
              text: t("radarr:announced") as string,
              style: "default",
              onPress: () => {
                selectMovieMinimumAvailability(MovieStatusType.announced);
              },
            },
            {
              text: t("radarr:inCinemas") as string,
              style: "default",
              onPress: () => {
                selectMovieMinimumAvailability(MovieStatusType.inCinemas);
              },
            },
            {
              text: t("radarr:released") as string,
              style: "default",
              onPress: () => {
                selectMovieMinimumAvailability(MovieStatusType.released);
              },
            },
            {
              text: t("common:cancel") as string,
              style: "cancel",
            },
          ]
        );
      },
    },
    {
      key: "common:quality",
      type: "action",
      selectionHint:
        (useRadarrStore
          .getState()
          ?.radarrQualityProfiles?.find(
            (profile) => profile.id === movieData?.qualityProfileId
          )?.name as string) ?? (qualityProfiles[0]?.name as string),
      onLoad: () => {
        setState({
          qualityProfileId:
            (useRadarrStore
              .getState()
              ?.radarrQualityProfiles?.find(
                (profile) => profile.id === movieData?.qualityProfileId
              )?.id as number) ?? (qualityProfiles[0]?.id as number),
        });
      },
      onPress: () => {
        const selectQuality = (id: number) => {
          setState({
            qualityProfileId: id,
          });
        };
        const getAlertButtons = () => {
          return (
            qualityProfiles.map(
              (profile) =>
                ({
                  text: profile.name as string,
                  style: "default",
                  onPress: () => {
                    selectQuality(profile.id as number);
                  },
                } as AlertButton)
            ) ?? []
          );
        };
        Alert.alert(
          t("radarr:qualityProfile"),
          t("radarr:chooseTheQualityProfile") as string,
          [
            ...getAlertButtons(),
            {
              text: t("common:cancel") as string,
              style: "cancel",
            },
          ]
        );
      },
    },
    {
      key: "common:path",
      type: "action",
      selectionHint: (movieData?.path as string) ?? t("common:choosePath"),
      onPress: () => {
        const getPathOptions = () => {
          return rootFolders.map(
            (folder) =>
              ({
                text: `${folder}/${movieData?.title}`,
                style: "default",
                onPress: () => {
                  setState({
                    path: `${folder}/${movieData?.title}`,
                  });
                },
              } as AlertButton)
          );
        };
        Alert.prompt(
          t("radarr:moviePath"),
          undefined,
          [
            ...getPathOptions(),
            {
              text: t("common:cancel") as string,
              style: "cancel",
            },
            {
              text: t("common:ok") as string,
              onPress: (value?: string) => {
                if (value && value !== "") {
                  setState({
                    path: value,
                  });
                }
              },
              style: "default",
            },
          ],
          "plain-text",
          (movieData?.path as string) ?? `${rootFolders[0]}/${movieData?.title}`
        );
      },
      lastItem: true,
    },
  ];
};

const RadarrEditMovie: React.FC<{
  data: MovieResource;
  imdbId: string;
  tmdbId: number;
  context: RadarrDetailScreenContext;
}> = ({ data, imdbId, tmdbId, context }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const toast = useToastController();

  const newMovieDataImdb = useGetApiV3MovieLookupImdb(
    {
      imdbId: imdbId,
    },
    {
      query: {
        enabled: !!imdbId,
      },
    }
  );
  useQueryEvents(newMovieDataImdb, {
    onSuccess: (data) => {
      setDataState(data);
    },
  });
  const newMovieDataTmdb = useGetApiV3MovieLookupTmdb(
    {
      tmdbId: tmdbId,
    },
    {
      query: {
        enabled: !imdbId && !!tmdbId,
      },
    }
  );
  useQueryEvents(newMovieDataTmdb, {
    onSuccess: (data) => {
      setDataState(data);
    },
  });

  const addMovie = usePostApiV3Movie({
    mutation: {
      onSuccess: () => {
        showToast(toast, t("radarr:movieAdded"), {
          type: "done",
        });
        navigation.goBack();
      },
      onError: (error) => {
        showToast(toast, t("radarr:error:addingMovieFailed"), {
          message: error.message,
          type: "error",
        });
      },
    },
  });
  const updateMovie = usePutApiV3MovieId({
    mutation: {
      onSuccess: () => {
        showToast(toast, t("radarr:movieUpdated"), {
          type: "done",
        });
        navigation.goBack();
      },
      onError: (error) => {
        showToast(toast, t("radarr:error:movieUpdateFailed"), {
          message: error.message,
          type: "error",
        });
      },
    },
  });
  const saveMovie = () => {
    if (!dataState.path) {
      Alert.alert(t("common:pleaseChooseAPath"));
      return;
    }
    if (context === RadarrDetailScreenContext.AddMovie) {
      addMovie.mutate({
        data: dataState,
      });
    }
    if (context === RadarrDetailScreenContext.EditMovie) {
      updateMovie.mutate({
        id: (data.id as number).toString(),
        data: dataState,
      });
    }
  };

  const qualityProfiles = useRadarrStore.getState()
    .radarrQualityProfiles as QualityProfileResource[];
  const rootFolders = useRadarrStore.getState()
    .radarrRootFolderCache as string[];

  const [dataState, setDataState] = React.useState<MovieResource>(data);
  const setStateHelper = (value: Partial<MovieResource>) => {
    setDataState({ ...dataState, ...value });
  };

  const getEditMovieOptions = React.useCallback(() => {
    return getRadarrEditDetailOptions(
      t,
      dataState,
      qualityProfiles,
      rootFolders,
      setStateHelper
    );
  }, [dataState]);

  return (
    <YStack height="100%" width="100%">
      <XStack flex={1}>
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: 13,
            paddingTop: 10,
          }}
          data={getEditMovieOptions()}
          renderItem={({ item }) => (
            <SettingsOption
              t={t}
              item={item}
              style={{
                overflow: "hidden",
              }}
            />
          )}
          ListHeaderComponent={
            <XStack flex={1}>
              {context === RadarrDetailScreenContext.AddMovie && (
                <XStack
                  flex={1}
                  height="$4"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <SectionTitle>{dataState?.title}</SectionTitle>
                  {(newMovieDataImdb.status === "pending" ||
                    (!imdbId &&
                      !!tmdbId &&
                      newMovieDataTmdb.status === "pending")) && (
                    <Spinner marginRight="$3" />
                  )}
                </XStack>
              )}
            </XStack>
          }
          ListFooterComponent={() => (
            <Button
              flex={1}
              marginTop="$3"
              backgroundColor="$yellow7"
              onPress={saveMovie}
            >
              <XStack flex={1} alignItems="center" justifyContent="center">
                {context === RadarrDetailScreenContext.AddMovie ? (
                  <>
                    <Plus size="$1" />
                    <Text color="$color" marginLeft="$1">
                      {t("common:save")}
                    </Text>
                  </>
                ) : (
                  <>
                    <Pencil size="$1" />
                    <Text color="$color" marginLeft="$1.5">
                      {t("common:update")}
                    </Text>
                  </>
                )}
              </XStack>
            </Button>
          )}
          estimatedItemSize={43}
        />
      </XStack>
    </YStack>
  );
};

export default RadarrEditMovie;
