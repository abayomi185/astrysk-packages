import React from "react";
import { useRouter, usePathname } from "expo-router";
import { RefreshControl } from "react-native";
import { YStack, XStack, Button, H4 } from "tamagui";
import {
  getNumberValue,
  getStringValue,
  useQueryLoadingSpinner,
} from "@astrysk/utils";
import { SettingsOption } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import { ProxmoxChartProps, ProxmoxListContext } from "../../types";
import { SettingsOptionProps } from "@astrysk/types";
import { FlashList } from "@shopify/flash-list";
import {
  GetClusterResourcesResponseResponseDataItem,
  GetNodesSingleStatusResponseResponseData,
  useGetClusterResources,
  useGetNodeRRDData,
  useGetNodesSingleStatus,
} from "../../api";
import { ClusterResourceTypeIcon } from "../search/clusterResource";
import { TFunction } from "i18next";
import {
  convertSecondsToDays,
  convertSecondsToReadable,
  getBytesToGBMultiplier,
  getBytesToMegabitsMultiplier,
} from "../../utils";
import {
  ProxmoxChartWrapper,
  ProxmoxHistoricChartWrapper,
} from "../detail/charts";
import { HOME } from "@astrysk/constants/screens";

const getProxmoxSummaryDetailOptions = (
  t: TFunction,
  resourceData: GetClusterResourcesResponseResponseDataItem,
  nodeStatus: GetNodesSingleStatusResponseResponseData
): SettingsOptionProps[] => {
  return [
    {
      key: "proxmox:status",
      type: "label",
      value: t(`proxmox:${getStringValue(resourceData?.status)}`) as string,
      firstItem: true,
    },
    {
      key: "proxmox:uptime",
      type: "label",
      value: `${convertSecondsToDays(getNumberValue(resourceData?.uptime))} ${t(
        "proxmox:days"
      )} ${convertSecondsToReadable(getNumberValue(resourceData?.uptime))}`,
    },
    {
      key: "proxmox:cpu(s)",
      type: "label",
      value: `${getNumberValue(resourceData?.maxcpu)}`,
    },
    {
      key: "proxmox:cpuinfo",
      type: "label",
      value: getStringValue(nodeStatus?.cpuinfo?.model),
    },
    {
      key: "proxmox:kveversion",
      type: "label",
      value: nodeStatus?.kversion.split(/(?=PVE)/),
    },
    {
      key: "proxmox:pveversion",
      type: "label",
      value: getStringValue(nodeStatus?.pveversion),
      lastItem: true,
    },
  ];
};

const getProxmoxSummaryProgressBarOptions = (
  t: TFunction
): ProxmoxChartProps[] => {
  return [
    // NOTE: The following are current data
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
    // Load average current
    // WARN: Put in settingsoption instead
    // {
    //   id: "load_current",
    //   type: "progress",
    //   legend: t("proxmox:loadAverage") as string,
    // },
    // IO delay current
    {
      id: "ioDelay_current",
      type: "progress",
      legend: t("proxmox:ioDelay") as string,
      dataKeys: ["wait"],
      dataMaxValueKey: 1,
      context: ProxmoxListContext.Metrics,
    },
    // Memory usage current
    {
      id: "memory",
      type: "progress",
      legend: t("proxmox:memory") as string,
      dataKeys: ["memory.used"],
      dataMaxValueKey: "memory.total",
      dataValueMultiplier: getBytesToGBMultiplier(),
      dataValueUnit: "GB",
      context: ProxmoxListContext.Metrics,
    },
    // Disk space current
    {
      id: "diskSpace_current",
      type: "progress",
      legend: t("proxmox:rootFs") as string,
      dataKeys: ["rootfs.used"],
      dataMaxValueKey: "rootfs.total",
      dataValueMultiplier: getBytesToGBMultiplier(),
      dataValueUnit: "GB",
      context: ProxmoxListContext.Metrics,
    },
    // Swap usage current
    {
      id: "swap_current",
      type: "progress",
      legend: t("proxmox:swap") as string,
      dataKeys: ["swap.used"],
      dataMaxValueKey: "swap.total",
      dataValueMultiplier: getBytesToGBMultiplier(),
      dataValueUnit: "GB",
      context: ProxmoxListContext.Metrics,
      lastItem: true,
    },
  ];
};

const getProxmoxSummaryHistoricChartOptions = (
  t: TFunction
): ProxmoxChartProps[] => {
  return [
    // NOTE: The following are historical data
    // CPU
    {
      id: "cpuUsage",
      type: "line_area",
      legend: t("proxmox:cpuUsage") as string,
      dataKeys: ["cpu"],
      dataMaxValueKey: 1,
      dataValueUnit: "%",
      decimalPrecision: 2,
      context: ProxmoxListContext.Metrics,
      firstItem: true,
    },
    // Server Load
    {
      id: "serverLoad",
      type: "line_area",
      legend: t("proxmox:serverLoad") as string,
      dataKeys: ["loadavg", "maxcpu"],
      decimalPrecision: 0,
      context: ProxmoxListContext.Metrics,
    },
    // Memory usage
    {
      id: "memoryUsage",
      type: "line_area",
      legend: t("proxmox:memoryUsage") as string,
      dataKeys: ["memused", "memtotal"],
      dataValueMultiplier: getBytesToGBMultiplier(),
      dataValueUnit: "GB",
      decimalPrecision: 0,
      context: ProxmoxListContext.Metrics,
    },
    // Swap usage
    {
      id: "swapUsage",
      type: "line_area",
      legend: t("proxmox:swapUsage") as string,
      dataKeys: ["swapused", "swaptotal"],
      dataValueMultiplier: getBytesToGBMultiplier(),
      dataValueUnit: "GB",
      decimalPrecision: 0,
      context: ProxmoxListContext.Metrics,
    },
    // Network traffic
    {
      id: "networkTraffic",
      type: "line_area",
      legend: t("proxmox:networkTraffic") as string,
      dataKeys: ["netin", "netout"],
      lastItem: true,
      dataValueMultiplier: getBytesToMegabitsMultiplier(),
      dataValueUnit: "Mbps",
      context: ProxmoxListContext.Metrics,
    },
  ];
};

const ProxmoxSummary: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [selectedNode, setSelectedNode] = React.useState<string | undefined>(
    undefined
  );

  const routePathname = usePathname();
  const HOME_PATH = `/${HOME}`;

  const clusterStatus = useGetClusterResources({
    query: {
      // initialData: ,
      select: (response) => {
        // Filter data - Only node data is needed
        return response.data?.filter((data) => data.type === "node");
      },
      onSuccess: (data) => {
        if (selectedNode === undefined) {
          // Set the first node as the selected node
          setSelectedNode(data?.[0].node);
        }
      },
      refetchInterval: 5000,
      enabled: routePathname === HOME_PATH,
    },
  });

  const nodeStatus = useGetNodesSingleStatus(`${selectedNode}`, {
    query: {
      select: (response) => response.data,
      refetchInterval: 5000,
      enabled: selectedNode !== undefined && routePathname === HOME_PATH,
    },
  });

  const getClusterStatusForNode = (node: string) => {
    return clusterStatus.data?.filter(
      (data) => data.node === node
    )[0] as GetClusterResourcesResponseResponseDataItem;
  };

  const nodeHistoricData = useGetNodeRRDData(
    `${selectedNode}`,
    {
      // Needed to add this query param manually to the generated api functions/models
      timeframe: "day",
      cf: "AVERAGE",
    },
    {
      query: {
        select: (response) => response.data,
        refetchInterval: 0.9e6,
        enabled: selectedNode !== undefined && routePathname === HOME_PATH,
      },
    }
  );

  useQueryLoadingSpinner(clusterStatus);

  return (
    <YStack flex={1}>
      <FlashList
        data={[
          ...getProxmoxSummaryDetailOptions(
            t,
            getClusterStatusForNode(`${selectedNode}`),
            nodeStatus.data!
          ),
          ...getProxmoxSummaryProgressBarOptions(t),
          ...getProxmoxSummaryHistoricChartOptions(t),
        ]}
        extraData={[selectedNode]}
        renderItem={({ item }) => {
          if (item.context === ProxmoxListContext.Metrics) {
            if (item.type === "progress") {
              return (
                <ProxmoxChartWrapper props={item} nodeData={nodeStatus.data!} />
              );
            }
            return (
              <ProxmoxHistoricChartWrapper
                props={item as ProxmoxChartProps}
                rrdData={nodeHistoricData.data!}
                selectedNode={selectedNode}
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
        estimatedItemSize={100}
        ListHeaderComponent={
          <XStack flex={1} height="$8" marginBottom="$2">
            <FlashList
              horizontal={true}
              data={clusterStatus.data}
              renderItem={({ item }) => (
                <Button
                  flex={1}
                  width="$13"
                  marginVertical="$2"
                  backgroundColor={
                    item.node === selectedNode ? "$gray5" : "$gray1"
                  }
                  borderColor={item.node === selectedNode ? "$gray7" : "$gray1"}
                  borderWidth="$1.5"
                  padding="$2"
                  animation="delay"
                  marginBottom="$2"
                  borderRadius="$6"
                  onPress={() => setSelectedNode(item.node)}
                >
                  <XStack flex={1} justifyContent="center" alignItems="center">
                    <ClusterResourceTypeIcon type="node" />
                    <H4 color="$color" marginLeft="$2">
                      {item?.node}
                    </H4>
                  </XStack>
                </Button>
              )}
              estimatedItemSize={100}
              ListHeaderComponent={<XStack width="$0.75" marginLeft="$1.5" />}
              // Footer component is the same width as a single item in the list
              ListFooterComponent={<XStack width="$13" />}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={
                <Button
                  height="auto"
                  width="$13"
                  marginVertical="$2"
                  backgroundColor="$gray1"
                  borderColor="$gray1"
                  borderWidth="$1.5"
                  padding="$2"
                  animation="delay"
                  marginBottom="$2"
                  borderRadius="$6"
                >
                  <XStack flex={1} justifyContent="center" alignItems="center">
                    <ClusterResourceTypeIcon type="node" />
                    <H4 color="$color" marginLeft="$2">
                      node
                    </H4>
                  </XStack>
                </Button>
              }
            />
          </XStack>
        }
        ListFooterComponent={<XStack height="$5" />}
      />
    </YStack>
  );
};

export default ProxmoxSummary;
