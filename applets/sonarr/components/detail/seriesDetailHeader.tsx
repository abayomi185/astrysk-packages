import React from "react";
import { useRouter } from "expo-router";
import { YStack, XStack, H3, H4, Text, Button } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Image, ImageSource } from "expo-image";
import { SeriesResource } from "../../api";
import { SonarrActionPanel } from "./actionPanel";
import { useSonarrStore } from "../../store";
import {
  SonarrDetailScreenContext,
  SonarrDetailScreenProps,
} from "../../types";
import { Screens } from "@astrysk/constants";
import { useTranslation } from "react-i18next";
import { getSizeOnDisk, goToSonarrDetailScreen } from "../../utils";
import { TabContext } from "@astrysk/types";

const SonarrSeriesDetailHeader: React.FC<{
  forwardedData: SeriesResource;
  tabContext: TabContext;
}> = ({ forwardedData, tabContext }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const baseURL = useSonarrStore.getState().baseURL as string;
  const token = useSonarrStore.getState().token as string;

  const [readMore, _] = React.useState(false);
  const [titleLines, setTitleLines] = React.useState(2);
  const [summaryLines, setSummaryLines] = React.useState(5);

  const goToDescriptionScreen = (seriesId: number) => {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context: SonarrDetailScreenContext.SeriesDescription,
        itemId: seriesId,
      } as SonarrDetailScreenProps,
    });
  };

  return (
    <YStack paddingHorizontal="$3" paddingVertical="$3">
      <XStack width="100%">
        <XStack height="$12" width="$9">
          <Image
            style={{ flex: 1, overflow: "hidden", borderRadius: 15 }}
            source={
              {
                uri: `${baseURL}/api/MediaCover/${forwardedData.id}/poster.jpg?apikey=${token}`,
              } as ImageSource
            }
            recyclingKey={`${forwardedData.id}`}
          />
        </XStack>
        <YStack flex={1} marginLeft="$3">
          <H3
            numberOfLines={2}
            onTextLayout={(e) => setTitleLines(e.nativeEvent.lines.length)}
          >
            {forwardedData.title}
          </H3>
          <Text
            color="$gray11"
            numberOfLines={readMore ? 0 : titleLines == 2 ? 5 : 7}
            onTextLayout={(e) => setSummaryLines(e.nativeEvent.lines.length)}
          >
            {forwardedData.overview ?? t("sonarr:noDescriptionAvailable")}
          </Text>
          <Text
            display={!readMore && summaryLines >= 5 ? "flex" : "none"}
            color="$blue10Dark"
            onPress={() => {
              goToDescriptionScreen(forwardedData.id as number);
            }}
          >
            {t("common:readMore")}
          </Text>
        </YStack>
      </XStack>
      <XStack marginTop="$4" justifyContent="center">
        <SonarrActionPanel data={forwardedData} isSeries />
      </XStack>
      <Button
        height="auto"
        marginTop="$4"
        marginBottom="$2"
        paddingHorizontal="$3"
        paddingTop="$2"
        paddingBottom="$2.5"
        backgroundColor="$gray1"
        onPress={() =>
          goToSonarrDetailScreen({
            router,
            searchItemId: forwardedData.id as number,
            screenContext: SonarrDetailScreenContext.AllSeasons,
            tabContext: tabContext ?? TabContext.Search,
          })
        }
      >
        <XStack flex={1}>
          <YStack flex={1}>
            <H4 color="$gray12">{t("sonarr:allSeasons")}</H4>
            <Text color="$gray11" marginTop="$1">
              {`${getSizeOnDisk(
                forwardedData.statistics?.sizeOnDisk as number
              )} ${t("sonarr:gb")}`}
            </Text>
            <Text
              color={
                forwardedData.statistics?.percentOfEpisodes === 100
                  ? "$green9"
                  : forwardedData.statistics?.percentOfEpisodes === 0
                  ? "$red9"
                  : "$gray11"
              }
              marginTop="$1"
            >
              {`${
                forwardedData.statistics?.percentOfEpisodes &&
                forwardedData.statistics.percentOfEpisodes % 1 !== 0
                  ? forwardedData.statistics.percentOfEpisodes.toFixed(2)
                  : Math.floor(
                      forwardedData.statistics?.percentOfEpisodes as number
                    )
              }${t("sonarr:percent")} - ${
                forwardedData.statistics?.episodeFileCount
              }/${forwardedData.statistics?.episodeCount} ${t(
                "sonarr:monitoredEpisodes"
              )}`}
            </Text>
          </YStack>
          <XStack alignItems="center">
            <ChevronRight size={20} opacity={0.6} />
          </XStack>
        </XStack>
      </Button>
    </YStack>
  );
};

export default SonarrSeriesDetailHeader;
