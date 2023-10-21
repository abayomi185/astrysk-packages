import React, { Suspense } from "react";
import { useLocalSearchParams } from "expo-router";

import { useProxmoxStore } from "../store";
import { GetClusterResourcesResponseResponseDataItem } from "../api";
import { TabContext } from "@astrysk/types";
import {
  ExtendedGetClusterResourcesResponseResponseDataItem,
  ProxmoxDetailScreenContext,
  ProxmoxDetailScreenProps,
} from "../types";
import ProxmoxResourceDetail from "../components/detail/resourceDetail";

const ProxmoxDetail: React.FC = () => {
  const params = useLocalSearchParams() as ProxmoxDetailScreenProps;
  const refParams = React.useRef(params);

  const itemData = React.useMemo(() => {
    const dataToForward: ExtendedGetClusterResourcesResponseResponseDataItem = {
      ...useProxmoxStore.getState().proxmoxCache?.clusterResources?.[
        refParams.current.itemId as string
      ],
      proxmoxContext: params.context,
      proxmoxTabContext: params.tabContext,
    };

    if (refParams.current.context === ProxmoxDetailScreenContext.SearchItem) {
      return {
        ...dataToForward,
      } as ExtendedGetClusterResourcesResponseResponseDataItem;
    }
    return dataToForward;
  }, [refParams.current.itemId]);

  const getComponentToRender = () => {
    if (itemData?.proxmoxContext === ProxmoxDetailScreenContext.SearchItem) {
      return (
        <ProxmoxResourceDetail
          forwardedData={
            itemData as GetClusterResourcesResponseResponseDataItem
          }
          tabContext={itemData.proxmoxTabContext as TabContext}
        />
      );
    }
  };

  return <>{itemData && <Suspense>{getComponentToRender()}</Suspense>}</>;
};

export default ProxmoxDetail;
