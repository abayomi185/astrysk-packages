import React from "react";
import { useNavigation, usePathname } from "expo-router";
import {
  GetClusterResourcesResponseResponseDataItem,
  useGetClusterResources,
  useGetNodesSingleLxcSingleRrddata,
  useGetNodesSingleStorageSingleRrddata,
  useGetVMRRDData,
} from "../../api";
import { SettingsOptionProps, TabContext } from "@astrysk/types";
import { H3, Text, XStack, YStack } from "tamagui";
import { useProxmoxDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";
import ProxmoxActionPanel from "./actionPanel";
import {
  ClusterResourceStatusIcon,
  ClusterResourceTypeIcon,
} from "../search/clusterResource";
import { TFunction } from "i18next";
import { SettingsOption } from "@astrysk/components";
import {
  SCREEN_HEIGHT,
  convertBytesToGB,
  convertSecondsToDays,
  convertSecondsToReadable,
  getBytesToGBMultiplier,
  getBytesToMegabitsMultiplier,
  getBytesToTBMultiplier,
} from "../../utils";
import { getNumberValue } from "@astrysk/utils";
import { ProxmoxChartWrapper, ProxmoxHistoricChartWrapper } from "./charts";
import { ProxmoxChartProps, ProxmoxListContext } from "../../types";
import { SEARCH } from "@astrysk/constants/screens";

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
            context: ProxmoxListContext.Options,
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
            context: ProxmoxListContext.Options,
          },
          {
            key: "proxmox:maxcpu",
            type: "label",
            value: `${resourceData?.maxcpu}`,
            context: ProxmoxListContext.Options,
          },
          {
            key: "proxmox:maxmemory",
            type: "label",
            value: `${convertBytesToGB(resourceData?.maxmem as number)} ${t(
              "proxmox:gb"
            )}`,
            context: ProxmoxListContext.Options,
            lastItem: true,
          },
        ] as SettingsOptionProps[])
      : []),
    ...(resourceData?.type === "storage"
      ? [
          {
            key: "proxmox:status",
            type: "label",
            value: t(`proxmox:${resourceData?.status}`),
            context: ProxmoxListContext.Options,
            firstItem: true,
          },
          {
            key: "proxmox:content",
            type: "label",
            value: `${resourceData?.content}`,
            context: ProxmoxListContext.Options,
          },
          {
            key: "proxmox:filesystem",
            type: "label",
            value: `${resourceData?.plugintype}`,
            context: ProxmoxListContext.Options,
            lastItem: true,
          },
        ]
      : []),
  ] as SettingsOptionProps[];
};

// NOTE: The following are current data
const getProxmoxResourceDetailProgressBarOptions = (
  t: TFunction,
  type?: string
): ProxmoxChartProps[] => {
  return [
    ...((type === "qemu" || type === "lxc"
      ? [
          // CPU current
          {
            id: "cpu_current",
            type: "progress",
            legend: t("proxmox:cpu") as string,
            dataKeys: ["cpu"],
            dataMaxValueKey: 1,
            context: ProxmoxListContext.Metrics,
            firstItem: true,
          },
          // Memory usage current
          {
            id: "memory",
            type: "progress",
            legend: t("proxmox:memory") as string,
            dataKeys: ["mem"],
            dataMaxValueKey: "maxmem",
            dataValueMultiplier: getBytesToGBMultiplier(),
            dataValueUnit: "GB",
            context: ProxmoxListContext.Metrics,
          },
          // Disk space current
          {
            id: "diskSpace_current",
            type: "progress",
            legend: t("proxmox:disk") as string,
            dataKeys: ["disk"],
            dataMaxValueKey: "maxdisk",
            dataValueMultiplier: getBytesToGBMultiplier(),
            dataValueUnit: "GB",
            context: ProxmoxListContext.Metrics,
            lastItem: true,
          },
        ]
      : []) as ProxmoxChartProps[]),
    ...((type === "storage"
      ? [
          {
            id: "storage_current",
            type: "progress",
            legend: t("proxmox:usage") as string,
            dataKeys: ["disk"],
            dataMaxValueKey: "maxdisk",
            dataValueMultiplier: getBytesToGBMultiplier(),
            dataValueUnit: "GB",
            decimalPrecision: 1,
            context: ProxmoxListContext.Metrics,
            firstItem: true,
            lastItem: true,
          },
        ]
      : []) as ProxmoxChartProps[]),
    ...((type === "sdn"
      ? [
          // {
          //   id: "swap_current",
          //   type: "progress",
          //   legend: t("proxmox:swap") as string,
          //   dataKeys: ["swap.used"],
          //   dataMaxValueKey: "swap.total",
          //   dataValueMultiplier: getBytesToGBMultiplier(),
          //   dataValueUnit: "GB",
          //   lastItem: true,
          // },
        ]
      : []) as ProxmoxChartProps[]),
  ];
};

const getProxmoxResourceDetailHistoricChartOptions = (
  t: TFunction,
  type?: string
): ProxmoxChartProps[] => {
  // NOTE: The following are historical data
  return [
    ...((type === "qemu" || type === "lxc"
      ? [
          // CPU
          {
            id: "cpuUsage",
            type: "line_area",
            legend: t("proxmox:cpuUsage") as string,
            dataKeys: ["cpu"],
            dataMaxValueKey: "maxcpu",
            dataValueMultiplier: 100,
            dataValueUnit: "%",
            decimalPrecision: 2,
            context: ProxmoxListContext.Metrics,
            firstItem: true,
          },
          // Memory usage
          {
            id: "memoryUsage",
            type: "line_area",
            legend: t("proxmox:memoryUsage") as string,
            dataKeys: ["mem", "maxmem"],
            dataValueMultiplier: getBytesToGBMultiplier(),
            dataValueUnit: "GB",
            context: ProxmoxListContext.Metrics,
          },
          // Network traffic
          {
            id: "networkTraffic",
            type: "line_area",
            legend: t("proxmox:networkTraffic") as string,
            dataKeys: ["netin", "netout"],
            dataValueMultiplier: getBytesToMegabitsMultiplier(),
            dataValueUnit: "Mbps",
            context: ProxmoxListContext.Metrics,
            lastItem: true,
          },
        ]
      : []) as ProxmoxChartProps[]),
    ...((type === "storage"
      ? [
          {
            id: "storageUsage",
            type: "line_area",
            legend: t("proxmox:storageUsage") as string,
            dataKeys: ["used", "total"],
            dataValueMultiplier: getBytesToTBMultiplier(),
            dataValueUnit: "TB",
            decimalPrecision: 2,
            context: ProxmoxListContext.Metrics,
            firstItem: true,
            lastItem: true,
          },
        ]
      : []) as ProxmoxChartProps[]),
  ];
};

const ProxmoxResourceDetailHeader: React.FC<{
  t: TFunction;
  data: GetClusterResourcesResponseResponseDataItem;
  callback: (action?: string) => void;
}> = ({ t, data, callback }) => {
  return (
    <YStack paddingHorizontal="$2.5" paddingTop="$3">
      <XStack width="100%">
        <XStack height="$4" width="$7" marginTop="$0" justifyContent="center">
          <ClusterResourceTypeIcon type={data.type} size={44} />
        </XStack>
        <YStack flex={1} justifyContent="center">
          <XStack flex={1} alignItems="center">
            <H3 numberOfLines={1}>
              {data?.name ||
                data?.storage ||
                data?.sdn ||
                data?.node ||
                data?.id}
              {data?.template && data?.template !== 0
                ? ` (${t("proxmox:template")})`
                : ""}
            </H3>
            <XStack width="$1" marginLeft="$2">
              <ClusterResourceStatusIcon
                status={data.status}
                style={{ marginTop: "$1" }}
              />
            </XStack>
          </XStack>
          <Text color="$gray11">{data?.node}</Text>
        </YStack>
      </XStack>
      <XStack marginVertical="$2" justifyContent="center">
        {(data?.type === "qemu" || data?.type === "lxc") &&
        data?.template !== 1 ? (
          <ProxmoxActionPanel data={data} callback={callback} />
        ) : null}
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

  // const [resourceStatus, setResourceStatus] = React.useState<boolean>(
  //   forwardedData.status === "running" || forwardedData.status === "available"
  // );

  const routePathname = usePathname();
  const CHART_PATH = `/${SEARCH}/detail`;

  // Fetch data for the specific resource
  // Replaces the forwardedData with the fetched data
  // for up-to-date data
  const resource = useGetClusterResources({
    query: {
      initialData: { data: [forwardedData] },
      select: (response) => {
        // Filter data based on forwardedData.id
        return response.data?.filter((data) => data.id === forwardedData.id)[0];
      },
      refetchInterval: 5000,
      // enabled: resourceStatus,
    },
  });

  const vmHistoricData = useGetVMRRDData(
    forwardedData.node!,
    forwardedData.vmid!,
    { timeframe: "day", cf: "AVERAGE" },
    {
      query: {
        select: (response) => response.data,
        enabled:
          forwardedData.type === "qemu" && routePathname.startsWith(CHART_PATH),
      },
    }
  );
  // GetNodeRRDDataRequestParams
  const lxcHistoricData = useGetNodesSingleLxcSingleRrddata(
    forwardedData.node!,
    forwardedData.vmid!,
    { timeframe: "day", cf: "AVERAGE" },
    {
      query: {
        select: (response) => response.data,
        enabled:
          forwardedData.type === "lxc" && routePathname.startsWith(CHART_PATH),
      },
    }
  );

  const storageHistoricData = useGetNodesSingleStorageSingleRrddata(
    forwardedData.node!,
    forwardedData.storage!,
    { timeframe: "day", cf: "AVERAGE" },
    {
      query: {
        select: (response) => response.data,
        enabled:
          forwardedData.type === "storage" &&
          routePathname.startsWith(CHART_PATH),
      },
    }
  );

  const getHistoricData = React.useMemo(() => {
    switch (forwardedData.type) {
      case "qemu":
        return vmHistoricData.data;
      case "lxc":
        return lxcHistoricData.data;
      case "storage":
        return storageHistoricData.data;
      default:
        return undefined;
    }
  }, [vmHistoricData.data, lxcHistoricData.data, storageHistoricData.data]);

  const actionPanelCallback = (action?: string) => {
    resource.refetch();
  };

  useProxmoxDetailHeader(
    navigation,
    (forwardedData.storage || forwardedData.id) as string
  );

  return (
    <YStack flex={1}>
      <FlashList
        data={[
          ...getProxmoxResourceDetailOptions(
            t,
            resource.data as GetClusterResourcesResponseResponseDataItem
          ),
          ...getProxmoxResourceDetailProgressBarOptions(t, forwardedData.type),
          ...getProxmoxResourceDetailHistoricChartOptions(
            t,
            forwardedData.type
          ),
        ]}
        renderItem={({ item }) => {
          if (item.context === ProxmoxListContext.Metrics) {
            if (item.type === "progress") {
              return (
                <ProxmoxChartWrapper props={item} nodeData={resource.data} />
              );
            }
            return (
              <ProxmoxHistoricChartWrapper
                props={item as ProxmoxChartProps}
                rrdData={getHistoricData}
              />
            );
          }
          return (
            <SettingsOption
              t={t}
              item={item as SettingsOptionProps}
              alignCenter
              style={{
                marginHorizontal: "$3",
                overflow: "hidden",
              }}
            />
          );
        }}
        estimatedItemSize={185}
        ListHeaderComponent={
          <ProxmoxResourceDetailHeader
            t={t}
            data={resource.data as GetClusterResourcesResponseResponseDataItem}
            callback={actionPanelCallback}
          />
        }
        ListFooterComponent={<XStack height="$5" />}
      />
    </YStack>
  );
};

export default ProxmoxResourceDetail;
