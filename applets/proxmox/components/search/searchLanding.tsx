import React, { Suspense } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { H6, YStack, Text, XStack, Button } from "tamagui";
import { Image, ImageSource } from "expo-image";
import {
  ProxmoxDetailScreenContext,
  ProxmoxSearchFilterContext,
} from "../../types";
import { useProxmoxStore } from "../../store";
import { filterProxmoxSearchData, goToProxmoxDetailScreen } from "../../utils";
import {
  getFlashListColumnsFromViewType,
  useGetListColumnNumber,
  useQueryLoadingSpinner,
  useRefreshHandler,
} from "@astrysk/utils";
import { proxmoxColors } from "../../colors";
import { TabContext, ViewType } from "@astrysk/types";
import { useTranslation } from "react-i18next";
import { EmptyList } from "@astrysk/components";
import { Search } from "@tamagui/lucide-icons";
import { customTokens } from "@astrysk/styles";
import ClusterResources from "../detail/clusterResources";
import {
  GetClusterResourcesResponseResponseDataItem,
  useGetClusterResources,
} from "../../api";

const ProxmoxSearchLanding: React.FC<{
  searchTerm: string;
}> = ({ searchTerm }) => {
  const { t } = useTranslation();

  const flashListColumns = useGetListColumnNumber(customTokens.size[11].val);

  const viewType = useProxmoxStore((state) => state.viewType) ?? ViewType.Grid;

  const searchFilters = useProxmoxStore((state) => state.searchFilters);

  const clusterResources = useGetClusterResources({
    query: {
      select: (response) => {
        // Storage data order is not consistent from API
        // Sorting it here before use
        const data = response.data?.sort((a, b) => {
          if (a.type !== "storage" || b.type !== "storage") return 0;
          return (a.storage as string)?.localeCompare(b.storage as string) || 0;
        });
        return data;
      },
      onSuccess: (data) => {
        // console.log(JSON.stringify(data, null, 2));
        useProxmoxStore.setState((state) => ({
          proxmoxCache: {
            ...state.proxmoxCache,
            clusterResources: {
              ...state.proxmoxCache?.clusterResources,
              ...data?.reduce(
                (
                  acc: {
                    [key: string]: GetClusterResourcesResponseResponseDataItem;
                  },
                  item
                ) => {
                  if (item.id) acc[item.id] = item;
                  return acc;
                },
                {}
              ),
            },
          },
        }));
      },
    },
  });

  const getClusterResources = React.useCallback(() => {
    const initialResourcesData = [...(clusterResources.data ?? [])];
    let resourcesDataToReturn = initialResourcesData;

    if (searchTerm && initialResourcesData.length > 0) {
      const filteredResources = initialResourcesData.filter((data) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
          data.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
          data.id?.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
      resourcesDataToReturn = filteredResources;
    }
    resourcesDataToReturn =
      filterProxmoxSearchData<GetClusterResourcesResponseResponseDataItem>(
        resourcesDataToReturn,
        searchFilters?.[ProxmoxSearchFilterContext.Search]
      );

    return resourcesDataToReturn;
  }, [clusterResources.data, searchTerm, searchFilters]);

  useFocusEffect(
    React.useCallback(() => {
      clusterResources.refetch();
      searchTerm && clusterResources.refetch();
      return () => {};
    }, [])
  );

  useQueryLoadingSpinner(clusterResources);

  return (
    <Suspense>
      <YStack flex={1} height="100%" width="100%" paddingTop="$2">
        <ClusterResources
          data={getClusterResources()}
          queryStatus={clusterResources.status}
          refetch={clusterResources.refetch}
        />
      </YStack>
    </Suspense>
  );
};

export default ProxmoxSearchLanding;
