import React, { Suspense } from "react";
import { Animated, LayoutAnimation } from "react-native";
import {
  HistoryResource,
  SeriesResource,
  useGetApiV3HistorySeries,
} from "../../api";
import {
  XStack,
  YStack,
  Text,
  H4,
  Spinner,
  Button,
  H6,
  ColorTokens,
} from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { customTokens } from "@astrysk/styles";
import { TFunction } from "i18next";

const SonarrHistoryItemExpanded: React.FC<{
  t: TFunction;
  data: HistoryResource;
}> = ({ t, data }) => {
  return (
    <XStack flex={1} marginTop="$2">
      <YStack flex={1}>
        <Text color="$gray11" numberOfLines={1}>{`${t("sonarr:season")} ${
          data.episode?.seasonNumber
        } • ${t("sonarr:episode")} ${data.episode?.episodeNumber} - ${
          data.episode?.title
        }`}</Text>
        {data.eventType === "grabbed" && (
          <XStack marginTop="$3">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {t("sonarr:quality")}
            </Text>
            <Text color="$gray11">{data.quality?.quality?.name}</Text>
          </XStack>
        )}
        {/* <XStack marginTop="$3"> */}
        {/*   <Text */}
        {/*     color="$gray11" */}
        {/*     width="30%" */}
        {/*     textAlign="right" */}
        {/*     marginRight="$3" */}
        {/*   > */}
        {/*     {t("sonarr:languages")} */}
        {/*   </Text> */}
        {/*   <Text>{data.languages}</Text> */}
        {/* </XStack> */}
        {(data.eventType === "downloadFolderImported" ||
          data.eventType === "grabbed") && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {t("sonarr:client")}
            </Text>
            <Text color="$gray11">{data.data?.downloadClient}</Text>
          </XStack>
        )}
        {data.eventType === "grabbed" && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {t("sonarr:indexer")}
            </Text>
            <Text color="$gray11">{data.data?.indexer}</Text>
          </XStack>
        )}
        {data.eventType === "grabbed" && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {t("sonarr:releaseGroup")}
            </Text>
            <Text color="$gray11">{data.data?.releaseGroup}</Text>
          </XStack>
        )}
        {data.eventType === "downloadFolderImported" && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {`${t("sonarr:importedTo")}`}
            </Text>
            <Text flex={1} color="$gray11" numberOfLines={5}>
              {data.data?.importedPath}
            </Text>
          </XStack>
        )}
        {/* {data.eventType === "grabbed" && ( */}
        {/*   <XStack marginTop="$2.5"> */}
        {/*     <Text */}
        {/*       color="$gray11" */}
        {/*       width="30%" */}
        {/*       textAlign="right" */}
        {/*       marginRight="$3" */}
        {/*     > */}
        {/*       {t("sonarr:age")} */}
        {/*     </Text> */}
        {/*     <Text color="$gray11">{`${parseInt( */}
        {/*       data.data?.ageHours as string */}
        {/*     )} ${t("sonarr:hours")} ${parseInt( */}
        {/*       data.data?.ageMinutes as string */}
        {/*     )} ${t("sonarr:minutes")}`}</Text> */}
        {/*   </XStack> */}
        {/* )} */}
        {data.eventType === "episodeFileDeleted" && (
          <XStack marginTop="$2.5">
            <Text
              color="$gray11"
              width="30%"
              textAlign="right"
              marginRight="$3"
            >
              {`${t("sonarr:reason")}`}
            </Text>
            <Text flex={1} color="$gray11" numberOfLines={5}>
              {data.data?.reason}
            </Text>
          </XStack>
        )}
      </YStack>
    </XStack>
  );
};

export const SonarrHistoryItem: React.FC<{
  t: TFunction;
  data: HistoryResource;
}> = ({ t, data }) => {
  const buttonDefaultHeight = customTokens.size[11].val;
  const buttonExpandedHeight = customTokens.size[16].val;

  const [buttonHeight] = React.useState(
    new Animated.Value(buttonDefaultHeight)
  );
  const [expanded, setExpanded] = React.useState(false);

  const textColorMap: { [key: string]: ColorTokens } = {
    unknown: "$gray11",
    grabbed: "$green9",
    seriesFolderImported: "$green9",
    downloadFolderImported: "$green9",
    downloadFailed: "$red9",
    episodeFileDeleted: "$red9",
    episodeFileRenamed: "$orange9",
    downloadIgnored: "$orange9",
  };

  return (
    <Animated.View style={{ height: buttonHeight }}>
      <Button
        flex={1}
        marginVertical="$1.5"
        paddingVertical="$2"
        paddingHorizontal="$2.5"
        backgroundColor="$gray1"
        onPress={() => {
          Animated.timing(buttonHeight, {
            toValue: expanded ? buttonDefaultHeight : buttonExpandedHeight, // Set to whatever height values you need
            duration: 200,
            useNativeDriver: false, // height is not supported by the native driver
          }).start();
          setExpanded(!expanded);
        }}
        // animation="delay"
      >
        <YStack flex={1} marginTop="$1.5">
          <H6 numberOfLines={expanded ? 2 : 1}>{data.sourceTitle}</H6>
          {expanded ? (
            <SonarrHistoryItemExpanded t={t} data={data} />
          ) : (
            <YStack flex={1}>
              <Text color="$gray11" marginTop="$2" numberOfLines={1}>{`${t(
                "sonarr:season"
              )} ${data.episode?.seasonNumber} • ${t("sonarr:episode")} ${
                data.episode?.episodeNumber
              } - ${data.episode?.title}`}</Text>
              <Text color="$gray11" marginTop="$2">
                {`${new Date(data.date as string).toLocaleString(undefined, {
                  dateStyle: "long",
                  timeStyle: "short",
                })}`}
              </Text>
              <XStack alignItems="center" marginTop="$2.5">
                <H6
                  color={textColorMap[data.eventType as string]}
                  lineHeight={0}
                >
                  {t(`sonarr:${data.eventType}`)}
                </H6>
                {data.eventType === "grabbed" && (
                  <>
                    <Text color="$gray11">{" • "}</Text>
                    <H6 color={textColorMap[data.eventType]} lineHeight={0}>
                      {`${data.quality?.quality?.name}`}
                    </H6>
                  </>
                )}
              </XStack>
            </YStack>
          )}
        </YStack>
      </Button>
    </Animated.View>
  );
};

const SonarrHistory: React.FC<{
  data: SeriesResource;
  seasonNumber?: number;
}> = ({ data, seasonNumber }) => {
  const { t } = useTranslation();

  const seriesHistory = useGetApiV3HistorySeries(
    {
      seriesId: data.id,
      includeEpisode: true,
      ...(seasonNumber ? { seasonNumber: seasonNumber } : {}),
    },
    {
      query: {
        onSuccess: () => {},
      },
    }
  );

  return (
    <Suspense>
      <YStack height="100%" width="100%">
        <XStack flex={1} marginTop="$1">
          <FlashList
            contentContainerStyle={{
              paddingHorizontal: "12",
            }}
            data={seriesHistory.data}
            renderItem={({ item }: { item: HistoryResource }) => (
              <SonarrHistoryItem t={t} data={item} />
            )}
            estimatedItemSize={64}
            ListEmptyComponent={() => (
              <XStack justifyContent="center" marginTop="$5">
                {seriesHistory.status === "loading" ? (
                  <Spinner />
                ) : (
                  <H4 color="$gray11">{t("sonarr:noHistoryFound")}</H4>
                )}
              </XStack>
            )}
          />
        </XStack>
      </YStack>
    </Suspense>
  );
};

export default SonarrHistory;
