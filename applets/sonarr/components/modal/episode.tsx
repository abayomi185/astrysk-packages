import React from "react";
import { useTranslation } from "react-i18next";
import { Toasts } from "@backpackapp-io/react-native-toast";
import {
  EpisodeFileResource,
  EpisodeResource,
  HistoryResource,
  SeriesResource,
  useGetApiV3Episode,
  useGetApiV3HistorySeries,
} from "../../api";
import { useSonarrStore } from "../../store";
import { XStack, YStack, Text, Spinner, H4 } from "tamagui";
import { SonarrEpisodeActionPanel } from "../detail/actionPanel";
import { EmptyList, SectionTitle, SettingsOption } from "@astrysk/components";
import { FlashList } from "@shopify/flash-list";
import { SettingsOptionProps } from "@astrysk/types";
import { TFunction } from "i18next";
import {
  checkEpisodeHasAired,
  getSizeOnDisk,
  expandableItemAnimationHandler,
} from "../../utils";
import { SonarrHistoryItem } from "./history";
import { ToastModalProviderKey } from "../../types";
import { sonarrColors } from "../../colors";

const getSonarrEpisodeModalOptions = (
  t: TFunction,
  episodeData: EpisodeResource,
  episodeFileData: EpisodeFileResource,
  monitored: boolean
): SettingsOptionProps[] => {
  return [
    {
      key: "sonarr:monitoring",
      type: "label",
      value: monitored ? `${t("common:yes")}` : `${t("common:no")}`,
      firstItem: true,
      lastItem: episodeFileData ? false : true,
    },
    ...(episodeFileData
      ? ([
          {
            key: "sonarr:relativePath",
            type: "label",
            value: episodeFileData?.relativePath as string,
          },
          {
            key: "sonarr:video",
            type: "label",
            value: t(
              `sonarr:${episodeFileData?.mediaInfo?.videoCodec}`
            ) as string,
          },
          {
            key: "sonarr:audio",
            type: "label",
            value:
              `${episodeFileData?.mediaInfo?.audioCodec}` +
              ` • ${t(
                `sonarr:channel${episodeFileData?.mediaInfo?.audioChannels}`
              )}`,
          },
          {
            key: "sonarr:audioLanguages",
            type: "label",
            value: episodeFileData?.mediaInfo?.audioLanguages as string,
          },
          {
            key: "sonarr:subtitles",
            type: "label",
            value: episodeFileData?.mediaInfo?.subtitles as string,
          },
          {
            key: "sonarr:size",
            type: "label",
            value: `${getSizeOnDisk(episodeFileData?.size as number)} ${t(
              "sonarr:gb"
            )}`,
          },
          {
            key: "sonarr:added",
            type: "label",
            value: new Date(
              episodeFileData?.dateAdded as string
            ).toLocaleString(undefined, {
              dateStyle: "long",
              timeStyle: "short",
            }),
            lastItem: true,
          },
        ] as SettingsOptionProps[])
      : []),
  ];
};

const SonarrEpisode: React.FC<{
  data: EpisodeResource;
}> = ({ data }) => {
  const { t } = useTranslation();

  const flashListRef = React.useRef<FlashList<HistoryResource>>(null);

  const episodeFileData = useSonarrStore(
    (state) => state.sonarrEpisodeFileCache?.[data.episodeFileId as number]
  ) as EpisodeFileResource;

  const monitoredStatus = useSonarrStore(
    (state) =>
      state.sonarrEpisodeCache?.[data.seriesId as number]?.[data.id as number]
        ?.monitored as boolean
  );

  const seriesData = useSonarrStore.getState().sonarrSeriesCache?.[
    data.seriesId as number
  ] as SeriesResource;

  const episodeHasAired = checkEpisodeHasAired(
    data.airDateUtc as string,
    seriesData?.runtime ?? 1
  );

  const episode = useGetApiV3Episode(
    {
      seriesId: data.id,
      seasonNumber: data.seasonNumber,
      episodeIds: [data.id as number],
    },
    {
      query: {
        select: (episodeData) => episodeData[0],
        onSuccess: (episodeData) => {
          useSonarrStore.setState((state) => ({
            sonarrEpisodeCache: {
              ...state.sonarrEpisodeCache,
              [data.seriesId as number]: {
                ...state.sonarrEpisodeCache?.[data.seriesId as number],
                [data.id as number]: episodeData ?? data,
              },
            },
          }));
        },
      },
    }
  );

  const episodeHistory = useGetApiV3HistorySeries(
    {
      seriesId: data.seriesId,
      includeEpisode: true,
      seasonNumber: data.seasonNumber,
    },
    {
      query: {
        select: (episodesHistory) =>
          episodesHistory.filter(
            (episode) => episode.episode?.episodeNumber === data.episodeNumber
          ),
      },
    }
  );

  const refetchEpisodeData = () => {
    episode.refetch();
    episodeHistory.refetch();
  };

  return (
    <XStack width="100%" height="100%" paddingTop="$2">
      <FlashList
        data={getSonarrEpisodeModalOptions(
          t,
          data,
          episodeFileData,
          monitoredStatus
        )}
        extraData={monitoredStatus}
        renderItem={({ item }) => {
          return (
            <SettingsOption
              t={t}
              item={item as SettingsOptionProps}
              alignCenter
              style={{
                marginHorizontal: "$3",
                overflow: "hidden",
              }}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <YStack>
            <SectionTitle>{data.title}</SectionTitle>
            <YStack paddingHorizontal="$3">
              <Text
                color={
                  data.hasFile
                    ? "$gray11"
                    : episodeHasAired
                    ? "$red9"
                    : "$blue9"
                }
              >
                {data.hasFile
                  ? `${new Date(data.airDateUtc as string).toLocaleString(
                      undefined,
                      {
                        dateStyle: "long",
                      }
                    )}`
                  : episodeHasAired
                  ? t("sonarr:missing")
                  : t("sonarr:notAired")}
              </Text>
              <Text color="$gray11" marginTop="$2">{`${t("sonarr:season")} ${
                data.seasonNumber
              } • ${t("sonarr:episode")} ${data.episodeNumber}`}</Text>
              {data.overview && (
                <Text color="$gray11" marginTop="$2">{`${data.overview}`}</Text>
              )}
            </YStack>
            <XStack marginTop="$4" marginBottom="$4" justifyContent="center">
              <SonarrEpisodeActionPanel
                data={data}
                refetchEpisodeData={refetchEpisodeData}
              />
            </XStack>
          </YStack>
        }
        ListFooterComponent={
          <XStack minHeight="$20" flex={1} marginTop="$4">
            <FlashList
              data={episodeHistory.data}
              contentContainerStyle={{
                paddingHorizontal: "12",
              }}
              renderItem={({ item }) => {
                return (
                  <SonarrHistoryItem
                    t={t}
                    data={item}
                    pressHandler={() =>
                      expandableItemAnimationHandler<HistoryResource>(
                        flashListRef
                      )
                    }
                  />
                );
              }}
              estimatedItemSize={55}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <EmptyList
                  queryStatus={episodeHistory.status}
                  text={t("sonarr:noHistoryFound")}
                  accentColor={sonarrColors.accentColor}
                />
              )}
            />
          </XStack>
        }
        estimatedItemSize={59}
      />
      <Toasts
        providerKey={ToastModalProviderKey.Episode}
        extraInsets={{
          top: -50,
        }}
      />
    </XStack>
  );
};

export default SonarrEpisode;
