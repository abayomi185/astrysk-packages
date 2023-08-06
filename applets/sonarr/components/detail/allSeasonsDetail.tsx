import React from "react";
import { useNavigation } from "expo-router";
import { XStack, YStack, Text, H3 } from "tamagui";
import { SeriesResource } from "../../api";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { useSonarrDetailHeader } from "../useHeader";
import { getSizeOnDisk } from "../../utils";
import { SonarrSeasonActionPanel } from "./actionPanel";

const SonarrAllSeasonsDetail: React.FC<{
  forwardedData: SeriesResource;
}> = ({ forwardedData }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useSonarrDetailHeader(navigation, t("sonarr:allSeasons"));

  return (
    <YStack flex={1}>
      <FlashList
        data={(forwardedData.seasons as SeriesResource["seasons"])?.sort(
          (a, b) => (b.seasonNumber as number) - (a.seasonNumber as number)
        )}
        extraData={new Date()} // Temporary - for testing
        renderItem={({ item }) => (
          <YStack
            height="$11.5"
            marginHorizontal="$3"
            paddingVertical="$2.5"
            paddingHorizontal="$3.5"
            marginTop="$2"
            backgroundColor="$gray1"
            borderRadius="$5"
          >
            {item.seasonNumber === 0 ? (
              <H3>{`${t("sonarr:specials")}`}</H3>
            ) : (
              <H3>{`${t("sonarr:season")} ${item.seasonNumber as number}`}</H3>
            )}
            <Text color="$gray11" marginTop="$1">{`${getSizeOnDisk(
              item.statistics?.sizeOnDisk as number
            )} ${t("sonarr:gb")}`}</Text>
            <Text
              color={
                item.statistics?.percentOfEpisodes === 100
                  ? "$green9"
                  : item.statistics?.percentOfEpisodes === 0
                  ? "$red9"
                  : "$gray11"
              }
              marginTop="$1"
            >
              {`${item.statistics?.percentOfEpisodes}${t("sonarr:percent")} - ${
                item.statistics?.episodeFileCount
              }/${item.statistics?.episodeCount} ${t("sonarr:episodes")}`}
            </Text>
            <XStack flex={1} marginTop="$2.5" justifyContent="center">
              <SonarrSeasonActionPanel
                data={forwardedData}
                seasonNumber={item.seasonNumber as number}
              />
            </XStack>
          </YStack>
        )}
        estimatedItemSize={136}
        ListFooterComponent={<XStack height="$0.75" />}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
};

export default SonarrAllSeasonsDetail;
