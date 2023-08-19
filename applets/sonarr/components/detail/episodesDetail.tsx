import React, { Suspense } from "react";
import { RefreshControl } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Animated } from "react-native";
import { useNavigation } from "expo-router";
import { TabContext } from "@astrysk/types";
import { useSonarrDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { YStack, XStack, Button, H6, Text } from "tamagui";
import { ExtendedSeriesResource, SonarrDetailScreenContext } from "../../types";
import { FlashList } from "@shopify/flash-list";
import {
  EpisodeFileResource,
  EpisodeResource,
  useGetApiV3Episode,
  useGetApiV3Episodefile,
} from "../../api";
import { sonarrColors } from "../../colors";
import { TFunction } from "i18next";
import { customTokens } from "@astrysk/styles";
import {
  checkEpisodeHasAired,
  getSizeOnDisk,
  goToSonarrModalScreen,
} from "../../utils";
import { SonarrEpisodeItemActionPanel } from "./actionPanel";
import { useSonarrStore } from "../../store";
import { EmptyList } from "@astrysk/components";

const SonarrEpisodeItem: React.FC<{
  t: TFunction;
  data: EpisodeResource;
  fileData?: EpisodeFileResource;
}> = ({ t, data, fileData }) => {
  const router = useRouter();

  const buttonDefaultHeight = customTokens.size[10].val;
  const buttonExpandedHeight = customTokens.size[16].val;

  const [buttonHeight] = React.useState(
    new Animated.Value(buttonDefaultHeight)
  );
  const [expanded, setExpanded] = React.useState(false);

  const episodeHasAired = checkEpisodeHasAired(
    data.airDateUtc as string,
    data.series?.runtime ?? 1
  );

  return (
    <Button
      height="auto"
      marginVertical="$1.5"
      paddingVertical="$2"
      paddingHorizontal="$2.5"
      backgroundColor="$gray1"
      onPress={() => {
        // Animated.timing(buttonHeight, {
        //   toValue: expanded ? buttonDefaultHeight : buttonExpandedHeight, // Set to whatever height values you need
        //   duration: 200,
        //   useNativeDriver: false, // height is not supported by the native driver
        // }).start();
        // setExpanded(!expanded);
        goToSonarrModalScreen({
          router,
          searchItemId: data.seriesId as number,
          episodeId: data.id as number,
          seasonNumber: data.seasonNumber as number,
          screenContext: SonarrDetailScreenContext.EpisodeItem,
        });
      }}
    >
      <XStack flex={1} height="100%">
        <XStack width="auto" marginTop="$1" justifyContent="center">
          <H6>{data.episodeNumber}</H6>
        </XStack>
        <YStack flex={1} marginLeft="$2.5" marginTop="$1">
          <XStack flex={1}>
            <YStack flex={1}>
              <H6 numberOfLines={expanded ? 2 : 1}>{data.title}</H6>
              {expanded ? (
                <></>
              ) : (
                <YStack flex={1}>
                  <Text color="$gray11" marginTop="$2" numberOfLines={1}>
                    {new Date(data.airDateUtc as string).toLocaleString(
                      undefined,
                      {
                        dateStyle: "long",
                      }
                    )}
                  </Text>

                  <H6
                    color={
                      data.hasFile
                        ? "$green9"
                        : episodeHasAired
                        ? "$red9"
                        : "$blue9"
                    }
                    marginTop="$2"
                  >
                    {data.hasFile
                      ? fileData &&
                        `${fileData?.quality?.quality?.name} • ${getSizeOnDisk(
                          fileData?.size as number
                        )} ${t("sonarr:gb")}`
                      : episodeHasAired
                      ? t("sonarr:missing")
                      : t("sonarr:notAired")}
                  </H6>
                  <XStack alignItems="center" marginTop="$2.5"></XStack>
                </YStack>
              )}
            </YStack>
            <XStack width="$5" justifyContent="center">
              <SonarrEpisodeItemActionPanel t={t} data={data} />
            </XStack>
          </XStack>
        </YStack>
      </XStack>
    </Button>
  );
};

const SonarrAllEpisodesDetail: React.FC<{
  forwardedData: ExtendedSeriesResource;
  tabContext: TabContext;
  seasonNumber: number;
}> = ({ forwardedData, tabContext, seasonNumber }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [fileQueryEnabled, setFileQueryEnabled] = React.useState(false);

  const episodes = useGetApiV3Episode(
    {
      seriesId: forwardedData.id,
      // WARN: Here in case of all episodes option
      ...(seasonNumber ? { seasonNumber: seasonNumber } : {}),
    },
    {
      query: {
        onSuccess: (data) => {
          useSonarrStore.setState((state) => ({
            sonarrEpisodeCache: {
              ...state.sonarrEpisodeCache,
              [forwardedData.id as number]: {
                ...state.sonarrEpisodeCache?.[forwardedData.id as number],
                ...data.reduce(
                  (acc: { [key: number]: EpisodeResource }, item) => {
                    if (item.id) acc[item.id as number] = item;
                    return acc;
                  },
                  {}
                ),
              },
            },
          }));
          setFileQueryEnabled(true);
        },
      },
    }
  );

  const episodeFile = useGetApiV3Episodefile(
    {
      seriesId: forwardedData.id,
    },
    {
      query: {
        onSuccess: (data) => {
          useSonarrStore.setState((state) => ({
            sonarrEpisodeFileCache: {
              ...state.sonarrEpisodeFileCache,
              ...data.reduce(
                (acc: { [key: number]: EpisodeFileResource }, item) => {
                  if (item.id) acc[item.id as number] = item;
                  return acc;
                },
                {}
              ),
            },
          }));
        },
      },
    }
  );

  const refetchEpisodes = () => {
    episodes.refetch();
    episodeFile.refetch();
  };

  useFocusEffect(
    React.useCallback(() => {
      // Could check if data isStale first
      refetchEpisodes();
      return () => {};
    }, [])
  );

  useSonarrDetailHeader(
    navigation,
    forwardedData.sonarrSeasonNumber
      ? `${t("sonarr:episodes")} - ${t("sonarr:season")} ${seasonNumber}`
      : t("sonarr:allEpisodes")
  );

  return (
    <Suspense>
      <YStack height="100%" width="100%">
        <XStack flex={1} marginTop="$1">
          <FlashList
            data={episodes.data?.sort(
              (a, b) =>
                (b.episodeNumber as number) - (a.episodeNumber as number)
            )}
            extraData={episodeFile.data}
            contentContainerStyle={{
              paddingHorizontal: "12",
            }}
            renderItem={({
              item,
              extraData,
            }: {
              item: EpisodeResource;
              extraData?: EpisodeFileResource[];
            }) => (
              <SonarrEpisodeItem
                t={t}
                data={item}
                fileData={
                  extraData?.filter(
                    (episode) => episode.id === item.episodeFileId
                  )[0]
                }
              />
            )}
            estimatedItemSize={64}
            ListEmptyComponent={() => (
              <EmptyList
                queryStatus={episodes.status}
                text={t("sonarr:noHistoryFound")}
                accentColor={sonarrColors.accentColor}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={refetchEpisodes}
                tintColor={sonarrColors.accentColor}
              />
            }
          />
        </XStack>
      </YStack>
    </Suspense>
  );
};

export default SonarrAllEpisodesDetail;
