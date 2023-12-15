import React, { Suspense } from "react";
import { useGlobalSearchParams, useNavigation } from "expo-router";

import { useTranslation } from "react-i18next";

import {
  OllamaDetailScreenContext,
  OllamaDetailScreenProps,
  OllamaSearchFilterContext,
} from "../types";
import OllamaSearchFilterOptions from "../components/search/searchFilterOptions";
import { useOllamaModalHeader } from "../components/useHeader";

const OllamaModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useGlobalSearchParams() as OllamaDetailScreenProps;

  // NOTE: SEARCH FILTER
  if (params.context === OllamaDetailScreenContext.SearchFilter) {
    const filterType = params?.itemId as string;

    const searchContext =
      params.searchContext ?? OllamaSearchFilterContext.Search;

    useOllamaModalHeader(navigation, t(filterType));

    return (
      <OllamaSearchFilterOptions
        context={searchContext}
        filterType={filterType}
      />
    );
  }

  return null;
};

export default OllamaModal;
