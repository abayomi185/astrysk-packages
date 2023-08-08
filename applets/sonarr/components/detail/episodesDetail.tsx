import React, { Suspense } from "react";
import { Animated } from "react-native";
import { useNavigation } from "expo-router";
import { TabContext } from "@astrysk/types";
import { useSonarrDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { YStack, H3, H4, XStack, Spinner, Button, H6, Text, H5 } from "tamagui";
import { ExtendedSeriesResource } from "../../types";
import { FlashList } from "@shopify/flash-list";
import { EpisodeResource, useGetApiV3Episode } from "../../api";
import { sonarrColors } from "../../colors";
import { TFunction } from "i18next";
import { customTokens } from "@astrysk/styles";

const SonarrEpisodeItem: React.FC<{
  t: TFunction;
  data: EpisodeResource;
}> = ({ t, data }) => {
  const buttonDefaultHeight = customTokens.size[11].val;
  const buttonExpandedHeight = customTokens.size[16].val;

  const [buttonHeight] = React.useState(
    new Animated.Value(buttonDefaultHeight)
  );
  const [expanded, setExpanded] = React.useState(false);

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
      >
        <XStack flex={1} height="100%">
          <XStack width="$1" marginTop="$1" justifyContent="center">
            <H6>{data.episodeNumber}</H6>
          </XStack>
          <YStack flex={1} marginLeft="$2.5" marginTop="$1">
            <XStack flex={1}>
              <XStack flex={1}>
                <H6 numberOfLines={expanded ? 2 : 1}>{data.title}</H6>
                {expanded ? (
                  <></>
                ) : (
                  <YStack flex={1}>
                    <Text
                      color="$gray11"
                      marginTop="$2"
                      numberOfLines={1}
                    ></Text>
                    <Text color="$gray11" marginTop="$2"></Text>
                    <XStack alignItems="center" marginTop="$2.5">
                      <H6 lineHeight={0}></H6>
                    </XStack>
                  </YStack>
                )}
              </XStack>
              <XStack
                width="$5"
                justifyContent="center"
                backgroundColor="red"
              ></XStack>
            </XStack>
          </YStack>
        </XStack>
      </Button>
    </Animated.View>
  );
};

const SonarrAllEpisodesDetail: React.FC<{
  forwardedData: ExtendedSeriesResource;
  tabContext: TabContext;
  seasonNumber: number;
}> = ({ forwardedData, tabContext, seasonNumber }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const episodes = useGetApiV3Episode(
    {
      seriesId: forwardedData.id,
      // WARN: Here in case of all episodes option
      ...(seasonNumber ? { seasonNumber: seasonNumber } : {}),
    },
    {
      query: {
        onSuccess: () => {},
      },
    }
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
            extraData={new Date()}
            contentContainerStyle={{
              paddingHorizontal: "10",
            }}
            renderItem={({ item }: { item: EpisodeResource }) => (
              <>
                {/* <YStack height="$11.5"> */}
                {/*   <H3>{item.title}</H3> */}
                {/*   <XStack flex={1} marginTop="$2.5" justifyContent="center"> */}
                {/* <SonarrActionPanel */}
                {/*   data={forwardedData} */}
                {/*   seasonNumber={item.seasonNumber as number} */}
                {/* /> */}
                {/*   </XStack> */}
                {/* </YStack> */}
                <SonarrEpisodeItem t={t} data={item} />
              </>
            )}
            estimatedItemSize={64}
            ListEmptyComponent={() => (
              <XStack justifyContent="center" marginTop="$5">
                {episodes.status === "loading" ? (
                  <Spinner color={sonarrColors.accentColor} size="large" />
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

export default SonarrAllEpisodesDetail;
