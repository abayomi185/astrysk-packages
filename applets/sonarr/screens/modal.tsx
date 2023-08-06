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
import SonarrInteractiveSearch from "../components/modal/interactiveSearch";
import SonarrEditSeries from "../components/modal/editSeries";
import SonarrHistory from "../components/modal/history";
import SonarrSeriesDescription from "../components/modal/seriesDescription";
import { SeriesResource } from "../api";

const SonarrModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useSearchParams() as SonarrDetailScreenProps;

  const baseURL = useSonarrStore.getState().baseURL as string;

  const seriesId = parseInt(params?.itemId as string);
  const data = useSonarrStore.getState().sonarrCache?.[baseURL]?.[
    seriesId
  ] as SeriesResource;

  // NOTE: SERIES DESCRIPTION
  if (params.context === SonarrDetailScreenContext.SeriesDescription) {
    useSonarrModalHeader(navigation, t("sonarr:seriesDescription"));

    return <SonarrSeriesDescription data={data} />;
  }

  // NOTE: Edit Series
  if (params.context === SonarrDetailScreenContext.EditSeries) {
    useSonarrModalHeader(navigation, t("sonarr:editSeries"));

    return <SonarrEditSeries />;
  }

  // NOTE: Interactive Search
  if (
    params.context === SonarrDetailScreenContext.InteractiveSearch ||
    params.context === SonarrDetailScreenContext.SeasonInteractiveSearch
  ) {
    useSonarrModalHeader(navigation, t("sonarr:interactiveSearch"));

    return <SonarrInteractiveSearch />;
  }

  // NOTE: HISTORY
  if (
    params.context === SonarrDetailScreenContext.History ||
    params.context === SonarrDetailScreenContext.SeasonHistory
  ) {
    useSonarrModalHeader(navigation, t("sonarr:history"));

    return <SonarrHistory />;
  }

  return null;
};

export default SonarrModal;
