import React, { Suspense } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { useTranslation } from "react-i18next";

import { useProxmoxStore } from "../store";
import {
  ProxmoxDetailScreenContext,
  ProxmoxDetailScreenProps,
  ProxmoxSearchFilterContext,
} from "../types";
import ProxmoxSearchFilterOptions from "../components/search/searchFilterOptions";
import { useProxmoxModalHeader } from "../components/useHeader";
import ProxmoxTaskHistory from "../components/modal/taskHistory";

const ProxmoxModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useLocalSearchParams() as ProxmoxDetailScreenProps;

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

  if (params.context === ProxmoxDetailScreenContext.History) {
    const node = params?.node as string;
    const resource = params?.itemId as string;

    useProxmoxModalHeader(
      navigation,
      `${t("proxmox:taskHistory")} • ${resource}`
    );

    return <ProxmoxTaskHistory node={node} resource={resource} />;
  }

  return null;
};

export default ProxmoxModal;
