import React from "react";
import { useNavigation } from "expo-router";
import { XStack, YStack, Text } from "tamagui";
import { SeriesResource } from "../../api";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { useSonarrDetailHeader } from "../useHeader";

const SonarrAllSeasonsDetail: React.FC<{
  forwardedData: SeriesResource;
}> = ({ forwardedData }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  React.useEffect(() => {
    console.log(JSON.stringify(forwardedData, null, 2));
  }, []);

  useSonarrDetailHeader(navigation, t("sonarr:allSeasons"));

  return (
    <YStack flex={1} backgroundColor="red">
      <FlashList
        data={forwardedData.seasons as SeriesResource["seasons"]}
        extraData={new Date()} // Temporary - for testing
        renderItem={({ item }) => (
          <XStack height="$3">
            <Text>{item.seasonNumber}</Text>
          </XStack>
        )}
        estimatedItemSize={50}
        // estimatedItemSize={50}
      />
    </YStack>
  );
};

export default SonarrAllSeasonsDetail;
