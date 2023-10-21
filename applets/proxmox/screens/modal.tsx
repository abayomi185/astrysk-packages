import React, { Suspense } from "react";
import { useSearchParams, useNavigation } from "expo-router";

import { useTranslation } from "react-i18next";

import { useProxmoxStore } from "../store";
import {
  ProxmoxDetailScreenContext,
  ProxmoxDetailScreenProps,
  ProxmoxSearchFilterContext,
} from "../types";
import ProxmoxSearchFilterOptions from "../components/search/searchFilterOptions";
import { useProxmoxModalHeader } from "../components/useHeader";

const ProxmoxModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useSearchParams() as ProxmoxDetailScreenProps;

  // NOTE: SEARCH FILTER
  if (params.context === ProxmoxDetailScreenContext.SearchFilter) {
    const filterType = params?.itemId as string;

    const searchContext =
      params.searchContext ?? ProxmoxSearchFilterContext.Search;

    useProxmoxModalHeader(navigation, t(filterType));

    return (
      <ProxmoxSearchFilterOptions
        context={searchContext}
        filterType={filterType}
      />
    );
  }

  return null;
};

export default ProxmoxModal;
