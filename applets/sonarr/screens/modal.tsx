import React, { Suspense } from "react";
import { useSearchParams, useNavigation } from "expo-router";

import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";

import { useSonarrStore } from "../store";
import { SettingsOption, SettingsOptionHeader } from "@astrysk/components";
import { SettingsOptionProps } from "@astrysk/types";
import { SonarrDetailScreenContext, SonarrDetailScreenProps } from "../types";

import { Text, ScrollView, XStack, YStack, H4 } from "tamagui";
import { useSonarrModalHeader } from "../components/useHeader";

const SonarrModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useSearchParams() as SonarrDetailScreenProps;

  const baseURL = useSonarrStore.getState().baseURL as string;

  // NOTE: SERIES DESCRIPTION
  if (params.context === SonarrDetailScreenContext.SeriesDescription) {
    const seriesId = parseInt(params?.itemId as string);

    const data = useSonarrStore.getState().sonarrCache?.[baseURL]?.[seriesId];

    useSonarrModalHeader(navigation, t("sonarr:seriesDescription"));

    return (
      <ScrollView height="100%" nestedScrollEnabled>
        <H4 paddingHorizontal="$4" paddingTop="$4">
          {data?.title}
        </H4>
        <Text
          color="$gray11"
          paddingHorizontal="$4"
          paddingVertical="$4"
          fontSize={18}
          lineHeight={24}
        >
          {data?.overview}
        </Text>
      </ScrollView>
    );
  }

  // NOTE: Edit Series
  if (params.context === SonarrDetailScreenContext.EditSeries) {
    return <></>;
  }

  // NOTE: Interactive Search
  if (
    params.context === SonarrDetailScreenContext.InteractiveSearch ||
    params.context === SonarrDetailScreenContext.SeasonInteractiveSearch
  ) {
    return <></>;
  }

  // NOTE: HISTORY
  if (
    params.context === SonarrDetailScreenContext.History ||
    params.context === SonarrDetailScreenContext.SeasonHistory
  ) {
    return <></>;
  }

  // NOTE: EPIOSDE LIST
  if (params.context === SonarrDetailScreenContext.EpisodesList) {
    return <></>;
  }

  return null;
};

export default SonarrModal;
