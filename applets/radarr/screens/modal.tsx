import React, { Suspense } from "react";
import { useSearchParams, useNavigation, usePathname } from "expo-router";

import { useTranslation } from "react-i18next";

import { useRadarrStore } from "../store";
import { SettingsOption, SettingsOptionHeader } from "@astrysk/components";
import { SettingsOptionProps } from "@astrysk/types";
import {
  RadarrDetailScreenContext,
  RadarrDetailScreenProps,
  RadarrSearchFilterContext,
} from "../types";

import { useRadarrModalHeader } from "../components/useHeader";
import RadarrInteractiveSearch from "../components/modal/interactiveSearch";
import RadarrEditMovie from "../components/modal/editMovie";
import RadarrHistory from "../components/modal/history";
import RadarrMovieDescription from "../components/modal/movieDescription";
import { MovieResource } from "../api";
import RadarrSearchFilterOptions from "../components/search/searchFilterOptions";

const RadarrModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useSearchParams() as RadarrDetailScreenProps;

  const movieId = parseInt(params?.itemId as string);
  const data = useRadarrStore.getState().radarrMovieCache?.[
    movieId
  ] as MovieResource;

  // NOTE: MOVIE DESCRIPTION
  if (params.context === RadarrDetailScreenContext.MovieDescription) {
    useRadarrModalHeader(navigation, t("radarr:movieDescription"));

    return <RadarrMovieDescription data={data} />;
  }

  // NOTE: EDIT MOVIE
  if (
    params.context === RadarrDetailScreenContext.EditMovie ||
    params.context === RadarrDetailScreenContext.AddMovie
  ) {
    const modalHeader =
      params.context === RadarrDetailScreenContext.EditMovie
        ? t("radarr:editMovie")
        : t("radarr:addMovie");
    useRadarrModalHeader(navigation, modalHeader);

    return (
      <RadarrEditMovie
        data={data}
        imdbId={params?.imdbId as string}
        tmdbId={params?.tmdbId as number}
        context={params.context}
      />
    );
  }

  // NOTE: INTERACTIVE SEARCH
  if (params.context === RadarrDetailScreenContext.InteractiveSearch) {
    useRadarrModalHeader(navigation, t("radarr:interactiveSearch"));

    return <RadarrInteractiveSearch data={data} />;
  }

  // NOTE: HISTORY
  if (params.context === RadarrDetailScreenContext.History) {
    useRadarrModalHeader(navigation, t("radarr:history"));
    return <RadarrHistory data={data} />;
  }

  // NOTE: SEARCH FILTER
  if (params.context === RadarrDetailScreenContext.SearchFilter) {
    const filterType = params?.itemId as string;

    const searchContext =
      params.searchContext ?? RadarrSearchFilterContext.Search;

    useRadarrModalHeader(navigation, t(filterType));

    return (
      <RadarrSearchFilterOptions
        context={searchContext}
        filterType={filterType}
      />
    );
  }

  return null;
};

export default RadarrModal;
