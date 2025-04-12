import React, { Suspense } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

import {
  JellyfinDetailScreenContext,
  JellyfinDetailScreenProps,
  JellyfinMediaItemSettingsType,
  JellyfinMoreDetailContext,
  JellyfinSearchFilterContext,
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
import { onItemLayout, useQueryEvents } from "@astrysk/utils";
import JellyfinMoreDetail from "../components/detail/moreDetail";

const JellyfinModal = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const params = useLocalSearchParams() as JellyfinDetailScreenProps;

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

    const searchContext =
      params.searchContext ?? JellyfinSearchFilterContext.Search;

    useJellyfinModalHeader(navigation, t(filterType));

    return (
      <JellyfinSearchFilterOptions
        context={searchContext}
        filterType={filterType}
      />
    );
  }

  // NOTE: SETTINGS
  if (params.context === JellyfinDetailScreenContext.SettingsOption) {
    const { t } = useTranslation();
    const settingsKey = params?.itemId as string;
    useJellyfinModalHeader(navigation, t(`${settingsKey}`));

    if (settingsKey === JellyfinSettingsKeys.Server) {
      const systemInfo = useGetSystemInfo();
      useQueryEvents(systemInfo, {
        onSuccess: (data) => {
          useJellyfinStore.setState((state) => ({
            userDetails: {
              ...state.userDetails,
              ServerName: data.ServerName,
            },
          }));
        },
      });

      const serverSettingsOptions: (string | SettingsOptionProps)[] = [
        "jellyfin:serverDetails",
        {
          key: "common:name",
          type: "label",
          value: useJellyfinStore.getState().userDetails?.ServerName as string,
          firstItem: true,
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
              contentContainerStyle={{ paddingHorizontal: 12 }}
              data={serverSettingsOptions}
              renderItem={({ item }) => {
                if (typeof item === "string") {
                  return (
                    <SettingsOptionHeader
                      t={t}
                      headerTitle={item as string}
                      style={{
                        paddingHorizontal: "$2",
                      }}
                    />
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
    const episodeId = params?.episodeId as string;
    const seriesId = params?.itemId as string;

    return (
      <JellyfinMoreDetail
        context={JellyfinMoreDetailContext.Episode}
        itemId={episodeId}
        seriesId={seriesId}
      />
    );
  }

  // NOTE: MORE DETAILS - MOVIE
  if (params.context === JellyfinDetailScreenContext.MovieMoreDetail) {
    const movieId = params?.itemId as string;

    return (
      <JellyfinMoreDetail
        context={JellyfinMoreDetailContext.Movie}
        itemId={movieId}
      />
    );
  }

  return null;
};

export default JellyfinModal;
