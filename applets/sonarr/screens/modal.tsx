import React, { Suspense } from "react";
import { useSearchParams, useNavigation } from "expo-router";

import { useTranslation } from "react-i18next";

import { useSonarrStore } from "../store";
import { SettingsOption, SettingsOptionHeader } from "@astrysk/components";
import { SettingsOptionProps } from "@astrysk/types";
import {
  SonarrDetailScreenContext,
  SonarrDetailScreenProps,
  SonarrSearchFilterContext,
} from "../types";

import { useSonarrModalHeader } from "../components/useHeader";
import SonarrInteractiveSearch from "../components/modal/interactiveSearch";
import SonarrEditSeries from "../components/modal/editSeries";
import SonarrHistory from "../components/modal/history";
import SonarrSeriesDescription from "../components/modal/seriesDescription";
import { EpisodeResource, SeriesResource } from "../api";
import SonarrEpisode from "../components/modal/episode";
import SonarrSearchFilterOptions from "../components/search/searchFilterOptions";

const SonarrModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useSearchParams() as SonarrDetailScreenProps;

  const seriesId = parseInt(params?.itemId as string);
  const data = useSonarrStore.getState().sonarrSeriesCache?.[
    seriesId
  ] as SeriesResource;

  // NOTE: SERIES DESCRIPTION
  if (params.context === SonarrDetailScreenContext.SeriesDescription) {
    useSonarrModalHeader(navigation, t("sonarr:seriesDescription"));

    return <SonarrSeriesDescription data={data} />;
  }

  // NOTE: EDIT SERIES
  if (
    params.context === SonarrDetailScreenContext.EditSeries ||
    params.context === SonarrDetailScreenContext.AddSeries
  ) {
    const modalHeader =
      params.context === SonarrDetailScreenContext.EditSeries
        ? t("sonarr:editSeries")
        : t("sonarr:addSeries");
    useSonarrModalHeader(navigation, modalHeader);

    return <SonarrEditSeries data={data} />;
  }

  // NOTE: INTERACTIVE SEARCH
  if (params.context === SonarrDetailScreenContext.InteractiveSearch) {
    useSonarrModalHeader(navigation, t("sonarr:interactiveSearch"));

    return (
      <SonarrInteractiveSearch
        data={data}
        seasonNumber={params?.seasonNumber}
        episodeId={params?.episodeId}
      />
    );
  }

  // NOTE: HISTORY
  if (params.context === SonarrDetailScreenContext.History) {
    useSonarrModalHeader(
      navigation,
      params.seasonNumber
        ? `${t("sonarr:history")} - ${t("sonarr:season")} ${
            params.seasonNumber == 0
              ? t("sonarr:(special)")
              : params.seasonNumber
          }`
        : t("sonarr:history")
    );
    return <SonarrHistory data={data} seasonNumber={params?.seasonNumber} />;
  }

  // NOTE: EPISODE
  if (params.context === SonarrDetailScreenContext.EpisodeItem) {
    const episodeId = params?.episodeId as number;
    const episodeData =
      useSonarrStore.getState().sonarrEpisodeCache?.[seriesId]?.[episodeId];

    useSonarrModalHeader(
      navigation,
      `${t("sonarr:episode")} ${episodeData?.episodeNumber}`
    );

    return <SonarrEpisode data={episodeData as EpisodeResource} />;
  }

  // NOTE: SEARCH FILTER
  if (params.context === SonarrDetailScreenContext.SearchFilter) {
    const filterType = params?.itemId as string;

    const searchContext =
      params.searchContext ?? SonarrSearchFilterContext.Search;

    useSonarrModalHeader(navigation, t(filterType));

    return (
      <SonarrSearchFilterOptions
        context={searchContext}
        filterType={filterType}
      />
    );
  }

  return null;
};

export default SonarrModal;
