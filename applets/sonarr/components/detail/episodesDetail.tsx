import React, { Suspense } from "react";
import { useNavigation } from "expo-router";
import { TabContext } from "@astrysk/types";
import { useSonarrDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { YStack, H3, H4, XStack, Spinner } from "tamagui";
import { ExtendedSeriesResource } from "../../types";
import { FlashList } from "@shopify/flash-list";
import { EpisodeResource, useGetApiV3Episode } from "../../api";
import { sonarrColors } from "../../colors";

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
      ? t("sonarr:episodes")
      : t("sonarr:allEpisodes")
  );

  return (
    <Suspense>
      <YStack height="100%" width="100%">
        <XStack flex={1}>
          <FlashList
            data={episodes.data}
            renderItem={({ item }: { item: EpisodeResource }) => (
              <YStack height="$11.5">
                <H3>{item.title}</H3>
                <XStack flex={1} marginTop="$2.5" justifyContent="center">
                  {/* <SonarrActionPanel */}
                  {/*   data={forwardedData} */}
                  {/*   seasonNumber={item.seasonNumber as number} */}
                  {/* /> */}
                </XStack>
              </YStack>
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
