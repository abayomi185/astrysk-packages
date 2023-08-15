import React from "react";
import { SeriesResource, usePostApiV3Series } from "../../api";
import { useSonarrStore } from "../../store";
import { TFunction } from "i18next";
import { SettingsOptionProps } from "@astrysk/types";
import { SonarrDetailScreenContext } from "../../types";
import { XStack, YStack } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { SettingsOption } from "@astrysk/components";

const getSonarrEditDetailOptions = (
  t: TFunction,
  seriesData: SeriesResource
): SettingsOptionProps[] => {
  return [
    {
      key: "sonarr:monitoring",
      type: "toggle",
      value: "",
      firstItem: true,
    },
    {
      key: "sonarr:seriesType",
      type: "label",
      value: seriesData?.seriesType,
    },
    {
      key: "common:path",
      type: "label",
      value: seriesData?.path as string,
    },
    {
      key: "common:quality",
      type: "label",
      value: useSonarrStore
        .getState()
        ?.sonarrQualityProfiles?.find(
          (profile) => profile.id === seriesData?.qualityProfileId
        )?.name as string,
    },
  ];
};

const SonarrEditSeries: React.FC<{
  data: SeriesResource;
  context: SonarrDetailScreenContext;
}> = ({ data, context }) => {
  const { t } = useTranslation();
  const series = usePostApiV3Series({
    mutation: {
      onSuccess: () => {},
    },
  });
  const postSeries = () => {
    // series.mutate(seriesData);
  };

  return (
    <YStack height="100%" width="100%">
      <XStack flex={1}>
        <FlashList
          contentContainerStyle={{
            paddingHorizontal: "7",
          }}
          data={getSonarrEditDetailOptions(t, data)}
          renderItem={({ item }) => <SettingsOption t={t} item={item} />}
          ListHeaderComponent={<XStack flex={1}></XStack>}
          // ListFooterComponent={() => <XStack marginLeft="$3" />}
          estimatedItemSize={43}
        />
      </XStack>
    </YStack>
  );
};

export default SonarrEditSeries;
