import React, { Suspense } from "react";
import { useNavigation } from "expo-router";
import { BaseItemDto, MediaStreamType, useGetPlaybackInfo } from "../../api";
import { useJellyfinStore } from "../../store";
import { JellyfinMediaItemSettingsOptions } from "../../settings";
import { useJellyfinModalHeader } from "../useHeader";
import { ScrollView, YStack, XStack, Text } from "tamagui";
import { onItemLayout } from "@astrysk/utils";
import { SettingsOption } from "@astrysk/components";
import {
  JellyfinMediaItemSettingsType,
  JellyfinMoreDetailContext,
} from "../../types";
import { JellyfinLanguageBottomSheet } from "./bottomSheet";
import { FlashList } from "@shopify/flash-list";
import { Image, ImageSource } from "expo-image";
import { useTranslation } from "react-i18next";
import { roundToNearestStandardResolution } from "../../utils";

const JellyfinMoreDetail: React.FC<{
  context: JellyfinMoreDetailContext;
  itemId: string; // episodeId or movieId
  seriesId?: string;
}> = ({ context, itemId, seriesId }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const baseURL = useJellyfinStore.getState().baseURL;
  const token = useJellyfinStore.getState().token;

  const userId = useJellyfinStore.getState().userDetails?.Id as string;

  const serverId = useJellyfinStore.getState().userDetails?.ServerId as string;

  let data: BaseItemDto = {};

  if (context === JellyfinMoreDetailContext.Episode) {
    data = (
      seriesId
        ? useJellyfinStore
            .getState()
            .mediaCache?.[serverId]?.episodesMediaCache?.[seriesId]?.data.find(
              (episode) => episode.Id === itemId
            )
        : {}
    ) as BaseItemDto;
  }

  if (context === JellyfinMoreDetailContext.Movie) {
    data = useJellyfinStore.getState().mediaCache?.[serverId]
      ?.movieMediaCache?.[itemId]?.data as BaseItemDto;
  }

  const primaryBlurHash = data?.ImageTags?.Primary as string;

  const headerTitle =
    context === JellyfinMoreDetailContext.Episode
      ? `${data?.SeriesName}`
      : `${data.Name}`;

  const playbackInfo = useGetPlaybackInfo(itemId, { userId });

  const videoDetails = playbackInfo.data?.MediaSources?.[0].MediaStreams?.find(
    (stream) => stream.Type === MediaStreamType.Video
  );

  const defaultAudioStreamIndex =
    playbackInfo.data?.MediaSources?.[0].DefaultAudioStreamIndex;
  const audioDetails = playbackInfo.data?.MediaSources?.[0].MediaStreams?.find(
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
    itemId,
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
          {context === JellyfinMoreDetailContext.Episode && (
            <XStack justifyContent="center">
              <XStack height="$14" width="100%" maxWidth="$24">
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
          )}
          {context === JellyfinMoreDetailContext.Movie && (
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
          )}
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
              <Text color="$gray9">{t(`jellyfin:${videoDetails?.Codec}`)}</Text>
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
                      <SettingsOption t={t} item={item} />
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
        id={itemId}
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
};

export default JellyfinMoreDetail;
