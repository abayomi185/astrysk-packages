import React from "react";
import { useNavigation } from "expo-router";
import {
  GetClusterResourcesResponseResponseDataItem,
  useGetClusterResources,
} from "../../api";
import { SettingsOptionProps, TabContext } from "@astrysk/types";
import { H3, Text, XStack, YStack } from "tamagui";
import { useProxmoxDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import ProxmoxActionPanel from "./actionPanel";
import { ClusterResourceTypeIcon } from "./clusterResource";
import { TFunction } from "i18next";
import { SettingsOption } from "@astrysk/components";
import { ProxmoxDetailCharts } from "./charts";
import {
  convertBytesToGB,
  convertSecondsToDays,
  convertSecondsToReadable,
} from "../../utils";
import { getNumberValue } from "@astrysk/utils";

const getProxmoxResourceDetailOptions = (
  t: TFunction,
  resourceData: GetClusterResourcesResponseResponseDataItem
): SettingsOptionProps[] => {
  return [
    ...(resourceData?.type === "qemu" || resourceData?.type === "lxc"
      ? ([
          {
            key: "proxmox:status",
            type: "label",
            value: t(`proxmox:${resourceData?.status}`),
            firstItem: true,
          },
          {
            key: "proxmox:uptime",
            type: "label",
            value: `${convertSecondsToDays(
              getNumberValue(resourceData?.uptime)
            )} ${t("proxmox:days")} ${convertSecondsToReadable(
              getNumberValue(resourceData?.uptime)
            )}`,
          },
          {
            key: "proxmox:maxcpu",
            type: "label",
            value: `${resourceData?.maxcpu}`,
          },
          {
            key: "proxmox:maxmemory",
            type: "label",
            value: `${convertBytesToGB(resourceData?.maxmem as number)} ${t(
              "proxmox:gb"
            )}`,
            lastItem: true,
          },
        ] as SettingsOptionProps[])
      : []),
  ];
};

const ProxmoxResourceDetailHeader: React.FC<{
  t: TFunction;
  data: GetClusterResourcesResponseResponseDataItem;
}> = ({ t, data }) => {
  return (
    <YStack paddingHorizontal="$3" paddingTop="$3">
      <XStack width="100%">
        <XStack height="$4" width="$7" marginTop="$0" justifyContent="center">
          <ClusterResourceTypeIcon type={data.type} size={44} />
        </XStack>
        <YStack flex={1} justifyContent="center">
          <H3 numberOfLines={1}>
            {data?.name || data?.storage || data?.sdn || data?.node || data?.id}
            {data?.template && data?.template !== 0
              ? ` (${t("proxmox:template")})`
              : ""}
          </H3>
          <Text color="$gray11">{data?.node}</Text>
        </YStack>
      </XStack>
      <XStack marginTop="$4" justifyContent="center">
        <ProxmoxActionPanel data={data} />
      </XStack>
    </YStack>
  );
};

const ProxmoxResourceDetail: React.FC<{
  forwardedData: GetClusterResourcesResponseResponseDataItem;
  tabContext: TabContext;
}> = ({ forwardedData, tabContext }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  // Fetch data for the specific resource
  const resource = useGetClusterResources({
    query: {
      initialData: { data: [forwardedData] },
      select: (response) => {
        // Filter data based on forwardedData.id
        return response.data?.filter((data) => data.id === forwardedData.id)[0];
      },
      // onSuccess: (data) => {
      //   console.log(JSON.stringify(data, null, 2));
      // },
      refetchInterval: 5000,
    },
  });

  useProxmoxDetailHeader(
    navigation,
    (forwardedData.storage || forwardedData.id) as string
  );

  return (
    <YStack flex={1}>
      <FlashList
        data={getProxmoxResourceDetailOptions(
          t,
          resource.data as GetClusterResourcesResponseResponseDataItem
        )}
        renderItem={({ item }) => {
          return (
            <SettingsOption
              t={t}
              item={item}
              alignCenter
              style={{
                marginHorizontal: "$3",
                overflow: "hidden",
              }}
            />
          );
        }}
        estimatedItemSize={76}
        ListHeaderComponent={
          <ProxmoxResourceDetailHeader
            t={t}
            data={resource.data as GetClusterResourcesResponseResponseDataItem}
          />
        }
        ListFooterComponent={
          <ProxmoxDetailCharts
            data={resource.data as GetClusterResourcesResponseResponseDataItem}
          />
        }
      />
    </YStack>
  );
};

export default ProxmoxResourceDetail;
