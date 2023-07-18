import React, { Suspense } from "react";
import { useSearchParams, useNavigation } from "expo-router";

import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
  JellyfinMediaItemSettingsType,
  JellyfinSettingsKeys,
} from "../types";
import { useJellyfinStore } from "../store";
import { useJellyfinModalHeader } from "../components/useHeader";
import { Text, ScrollView, XStack, YStack } from "tamagui";
import { Image, ImageSource } from "expo-image";
import JellyfinSearchFilterOptions from "../components/search/searchFilterOptions";
import { useTranslation } from "react-i18next";
import { MediaStreamType, useGetPlaybackInfo, useGetSystemInfo } from "../api";
import { FlashList } from "@shopify/flash-list";
import { SettingsOption, SettingsOptionHeader } from "@astrysk/components";
import { SettingsOptionProps } from "@astrysk/types";
import { roundToNearestStandardResolution } from "../utils";
import { JellyfinLanguageBottomSheet } from "../components/detail/bottomSheet";
import { JellyfinMediaItemSettingsOptions } from "../settings";
import { onItemLayout } from "@astrysk/utils";

const JellyfinModal = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const params = useSearchParams() as JellyfinDetailScreenProps;

  const baseURL = useJellyfinStore.getState().baseURL;
  const token = useJellyfinStore.getState().token;

  const userId = useJellyfinStore.getState().userDetails?.Id as string;

  const serverId = useJellyfinStore.getState().userDetails?.ServerId as string;

  // NOTE: SERIES DESCRIPTION
  if (params.context === JellyfinDetailScreenContext.SeriesDescription) {
    const seriesId = params?.itemId as string;

    const data =
      useJellyfinStore.getState().mediaCache?.[serverId]?.seriesMediaCache?.[
        seriesId
      ]?.data;

    useJellyfinModalHeader(navigation, data?.Name as string);

    return (
      <ScrollView height="100%" nestedScrollEnabled>
        <Text
          color="$gray11"
          paddingHorizontal="$4"
          paddingVertical="$4"
          fontSize={18}
          lineHeight={24}
        >
          {data?.Overview}
        </Text>
      </ScrollView>
    );
  }

  // NOTE: MOVIE DESCRIPTION
  if (params.context === JellyfinDetailScreenContext.MovieDescription) {
    const movieId = params?.itemId as string;

    const data =
      useJellyfinStore.getState().mediaCache?.[serverId]?.movieMediaCache?.[
        movieId
      ]?.data;

    useJellyfinModalHeader(navigation, data?.Name as string);

    return (
      <ScrollView nestedScrollEnabled>
        <Text
          color="$gray11"
          paddingHorizontal="$4"
          paddingTop="$4"
          fontSize={18}
          lineHeight={24}
        >
          {data?.Overview}
        </Text>
      </ScrollView>
    );
  }

  // NOTE: SEARCH FILTER
  if (params.context === JellyfinDetailScreenContext.SearchFilter) {
    const filterType = params?.itemId as string;

    useJellyfinModalHeader(navigation, filterType);

    return <JellyfinSearchFilterOptions filterType={filterType} />;
  }

  // NOTE: SETTINGS
  if (params.context === JellyfinDetailScreenContext.SettingsOption) {
    const { t } = useTranslation();
    const settingsKey = params?.itemId as string;
    useJellyfinModalHeader(navigation, t(`${settingsKey}`));

    if (settingsKey === JellyfinSettingsKeys.Server) {
      const systemInfo = useGetSystemInfo({
        query: {
          onSuccess: (data) => {
            useJellyfinStore.setState((state) => ({
              userDetails: {
                ...state.userDetails,
                ServerName: data.ServerName,
              },
            }));
          },
        },
      });

      const serverSettingsOptions: (string | SettingsOptionProps)[] = [
        "jellyfin:serverDetails",
        {
          key: "common:name",
          type: "label",
          value: useJellyfinStore.getState().userDetails?.ServerName as string,
        },
        {
          key: "common:url",
          type: "label",
          value: useJellyfinStore.getState().baseURL as string,
        },
        {
          key: "common:version",
          type: "label",
          value: systemInfo.data?.Version as string,
        },
        {
          key: "jellyfin:operatingSystem",
          type: "label",
          value: systemInfo.data?.OperatingSystem as string,
          lastItem: true,
        },
      ];

      return (
        <YStack height="100%" width="100%">
          <XStack flex={1}>
            <FlashList
              data={serverSettingsOptions}
              renderItem={({ item }) => {
                if (typeof item === "string") {
                  return (
                    <SettingsOptionHeader t={t} headerTitle={item as string} />
                  );
                } else {
                  return (
                    <SettingsOption
                      t={t}
                      item={item}
                      style={{
                        backgroundColor: "$gray1",
                      }}
                    />
                  );
                }
              }}
              getItemType={(item) => {
                return typeof item === "string" ? "sectionHeader" : "row";
              }}
              estimatedItemSize={100}
            />
          </XStack>
        </YStack>
      );
    }

    if (settingsKey === JellyfinSettingsKeys.PlayerOptions) {
      const serverSettingsOptions: (string | SettingsOptionProps)[] = [
        "jellyfin:videoPlayer",
        {
          key: "jellyfin:defaultSubtitleLanguage",
          type: "action",
        },
        {
          key: "jellyfin:defaultAudioLanguage",
          type: "action",
        },
      ];
      return (
        <YStack flex={1} backgroundColor="$background">
          <XStack flex={1}>
            <FlashList
              data={serverSettingsOptions}
              renderItem={({ item }) => {
                if (typeof item === "string") {
                  return (
                    <SettingsOptionHeader t={t} headerTitle={item as string} />
                  );
                } else {
                  return <SettingsOption t={t} item={item} />;
                }
              }}
              getItemType={(item) => {
                return typeof item === "string" ? "sectionHeader" : "row";
              }}
              estimatedItemSize={100}
            />
          </XStack>
        </YStack>
      );
    }

    return null;
  }

  // NOTE: MORE DETAILS - EPISODE
  if (params.context === JellyfinDetailScreenContext.EpisodeMoreDetail) {
    const seriesId = params?.itemId as string;
    const episodeId = params?.episodeId as string;

    const data = useJellyfinStore
      .getState()
      .mediaCache?.[serverId]?.episodesMediaCache?.[seriesId]?.data.find(
        (episode) => episode.Id === episodeId
      );

    const primaryBlurHash = data?.ImageTags?.Primary as string;

    const headerTitle = `${data?.SeriesName}`;

    const playbackInfo = useGetPlaybackInfo(episodeId, { userId });

    const videoDetails =
      playbackInfo.data?.MediaSources?.[0].MediaStreams?.find(
        (stream) => stream.Type === MediaStreamType.Video
      );

    const defaultAudioStreamIndex =
      playbackInfo.data?.MediaSources?.[0].DefaultAudioStreamIndex;
    const audioDetails =
      playbackInfo.data?.MediaSources?.[0].MediaStreams?.find(
        (stream) =>
          stream.Type === MediaStreamType.Audio &&
          stream.Index === defaultAudioStreamIndex
      );

    const [flashListHeight, setFlashListHeight] = React.useState(0);
    const [bottomSheetIndex, setBottomSheetIndex] = React.useState<number>(-1);
    const showBottomSheet = () => {
      setBottomSheetIndex(0);
    };

    const audioLanguages = React.useMemo(
      () =>
        Array.from(
          playbackInfo.data?.MediaSources?.[0].MediaStreams?.reduce(
            (acc, stream) => {
              if (stream.Type === MediaStreamType.Audio) {
                acc.add(stream.Language as string);
              }
              return acc;
            },
            new Set<string>()
          ) || new Set()
        ),
      [playbackInfo.data]
    );
    const subtitleLanguages = React.useMemo(
      () =>
        Array.from(
          playbackInfo.data?.MediaSources?.[0].MediaStreams?.reduce(
            (acc, stream) => {
              if (stream.Type === MediaStreamType.Subtitle) {
                acc.add(stream.Language as string);
              }
              return acc;
            },
            new Set<string>()
          ) || new Set()
        ),
      [playbackInfo.data]
    );

    const settingsOptions = JellyfinMediaItemSettingsOptions(
      episodeId,
      (audioLanguages?.length || 0) > 1, // boolean
      (subtitleLanguages?.length || 0) > 1, //boolean
      showBottomSheet
    );

    useJellyfinModalHeader(navigation, headerTitle, bottomSheetIndex === -1, [
      bottomSheetIndex,
    ]);

    return (
      <Suspense>
        <ScrollView height="100%" nestedScrollEnabled>
          <YStack padding="$4">
            <XStack height="$14" width="100%">
              <Image
                style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
                source={
                  {
                    uri: `${baseURL}/Items/${data?.Id}/Images/Primary?quality=80`,
                    headers: {
                      "X-Emby-Authorization": token,
                    },
                  } as ImageSource
                }
                placeholder={
                  data?.ImageBlurHashes?.Primary?.[primaryBlurHash] as string
                }
                transition={200}
              />
            </XStack>
            <Text
              color="$gray12"
              paddingTop="$4"
              fontSize={18}
              textAlign="center"
            >
              {data?.Name}
            </Text>
            <Text
              color="$gray11"
              paddingVertical="$4"
              fontSize={18}
              lineHeight={24}
            >
              {data?.Overview}
            </Text>
            <YStack width="100%">
              <Text color="$gray9">
                {playbackInfo.data?.MediaSources?.[0].Name}
              </Text>
              <XStack marginTop="$2">
                <Text color="$gray9">
                  {t(`jellyfin:${videoDetails?.Codec}`)}
                </Text>
                <Text color="$gray9" marginLeft="$2">
                  {`${roundToNearestStandardResolution(
                    videoDetails?.Height as number
                  )}p`}
                </Text>
                <Text color="$gray9" marginLeft="$2">
                  {t(`jellyfin:${audioDetails?.Codec}`)}
                </Text>
                <Text color="$gray9" marginLeft="$2">
                  {t(`jellyfin:channel${audioDetails?.Channels}`)}
                </Text>
              </XStack>
            </YStack>
            <XStack height="$1" />
            <YStack
              width="100%"
              minHeight="$3"
              borderRadius="$5"
              overflow="hidden"
            >
              <XStack flex={1} minHeight={flashListHeight}>
                <FlashList
                  data={settingsOptions}
                  renderItem={({ item }) => {
                    return (
                      <YStack
                        onLayout={onItemLayout(
                          flashListHeight,
                          setFlashListHeight
                        )}
                      >
                        <SettingsOption
                          t={t}
                          item={item}
                          style={{
                            backgroundColor: "$gray1",
                          }}
                        />
                      </YStack>
                    );
                  }}
                  getItemType={(item) => {
                    return typeof item === "string" ? "sectionHeader" : "row";
                  }}
                  estimatedItemSize={100}
                />
              </XStack>
            </YStack>
          </YStack>
          <XStack height="$4" />
        </ScrollView>
        <JellyfinLanguageBottomSheet
          id={episodeId}
          data={{
            [JellyfinMediaItemSettingsType.Audio]: audioLanguages as string[],
            [JellyfinMediaItemSettingsType.Subtitle]:
              subtitleLanguages as string[],
          }}
          bottomSheetIndex={bottomSheetIndex}
          setBottomSheetIndex={setBottomSheetIndex}
        />
      </Suspense>
    );
  }

  // NOTE: MORE DETAILS - MOVIE
  if (params.context === JellyfinDetailScreenContext.MovieMoreDetail) {
    const movieId = params?.itemId as string;

    const data =
      useJellyfinStore.getState().mediaCache?.[serverId]?.movieMediaCache?.[
        movieId
      ]?.data;

    const primaryBlurHash = data?.ImageTags?.Primary as string;

    const playbackInfo = useGetPlaybackInfo(movieId, { userId });

    const [flashListHeight, setFlashListHeight] = React.useState(0);
    const [bottomSheetIndex, setBottomSheetIndex] = React.useState<number>(-1);
    const showBottomSheet = () => {
      setBottomSheetIndex(0);
    };

    const audioLanguages = React.useMemo(
      () =>
        Array.from(
          playbackInfo.data?.MediaSources?.[0].MediaStreams?.reduce(
            (acc, stream) => {
              if (stream.Type === MediaStreamType.Audio) {
                acc.add(stream.Language as string);
              }
              return acc;
            },
            new Set<string>()
          ) || new Set()
        ),
      [playbackInfo.data]
    );
    const subtitleLanguages = React.useMemo(
      () =>
        Array.from(
          playbackInfo.data?.MediaSources?.[0].MediaStreams?.reduce(
            (acc, stream) => {
              if (stream.Type === MediaStreamType.Subtitle) {
                acc.add(stream.Language as string);
              }
              return acc;
            },
            new Set<string>()
          ) || new Set()
        ),
      [playbackInfo.data]
    );

    const settingsOptions = JellyfinMediaItemSettingsOptions(
      movieId,
      (audioLanguages?.length || 0) > 1, // boolean
      (subtitleLanguages?.length || 0) > 1, //boolean
      showBottomSheet
    );

    useJellyfinModalHeader(navigation, data?.Name as string);

    return (
      <Suspense>
        <ScrollView height="100%" nestedScrollEnabled>
          <YStack padding="$4">
            <XStack height="$20" width="100%" justifyContent="center">
              <XStack width="$14">
                <Image
                  style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
                  source={
                    {
                      uri: `${baseURL}/Items/${data?.Id}/Images/Primary?quality=80`,
                      headers: {
                        "X-Emby-Authorization": token,
                      },
                    } as ImageSource
                  }
                  placeholder={
                    data?.ImageBlurHashes?.Primary?.[primaryBlurHash] as string
                  }
                  transition={200}
                />
              </XStack>
            </XStack>
            <Text
              color="$gray11"
              paddingVertical="$4"
              fontSize={18}
              lineHeight={24}
            >
              {data?.Overview}
            </Text>
            <XStack height="$0.75" />
            <YStack
              width="100%"
              minHeight="$3"
              borderRadius="$5"
              overflow="hidden"
            >
              <XStack flex={1} minHeight={flashListHeight}>
                <FlashList
                  data={settingsOptions}
                  renderItem={({ item }) => {
                    return (
                      <YStack
                        onLayout={onItemLayout(
                          flashListHeight,
                          setFlashListHeight
                        )}
                      >
                        <SettingsOption
                          t={t}
                          item={item}
                          style={{
                            backgroundColor: "$gray1",
                          }}
                        />
                      </YStack>
                    );
                  }}
                  getItemType={(item) => {
                    return typeof item === "string" ? "sectionHeader" : "row";
                  }}
                  estimatedItemSize={100}
                />
              </XStack>
            </YStack>
          </YStack>
          <XStack height="$4" />
        </ScrollView>
        <JellyfinLanguageBottomSheet
          id={movieId}
          data={{
            [JellyfinMediaItemSettingsType.Audio]: audioLanguages as string[],
            [JellyfinMediaItemSettingsType.Subtitle]:
              subtitleLanguages as string[],
          }}
          bottomSheetIndex={bottomSheetIndex}
          setBottomSheetIndex={setBottomSheetIndex}
        />
      </Suspense>
    );
  }

  return null;
};

export default JellyfinModal;
