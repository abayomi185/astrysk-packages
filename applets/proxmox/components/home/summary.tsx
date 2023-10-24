import React from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { RefreshControl } from "react-native";
import { Image, ImageSource } from "expo-image";
import { YStack, XStack, Button, H4 } from "tamagui";
import {
  getNumberValue,
  getStringValue,
  useQueryLoadingSpinner,
} from "@astrysk/utils";
import { EmptyList, SectionTitle, SettingsOption } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import { useProxmoxStore } from "../../store";
import { ProxmoxDetailScreenContext, ProxmoxChartProps } from "../../types";
import { SettingsOptionProps } from "@astrysk/types";
import { FlashList } from "@shopify/flash-list";
import {
  GetClusterResourcesResponseResponseDataItem,
  GetNodesSingleStatusResponseResponseData,
  useGetClusterResources,
  useGetNodeRRDData,
  useGetNodesSingleStatus,
} from "../../api";
import { ClusterResourceTypeIcon } from "../detail/clusterResource";
import { TFunction } from "i18next";
import {
  convertSecondsToDays,
  convertSecondsToReadable,
  getBytesToGBMultiplier,
} from "../../utils";
import { ProxmoxSummaryChart } from "../detail/charts";
import { HOME } from "@astrysk/constants/screens";

const getProxmoxProgressBarOptions = (t: TFunction): ProxmoxChartProps[] => {
  return [
    // NOTE: The following are current data
    // CPU current
    {
      id: "cpu_current",
      type: "progress",
      legend: t("proxmox:cpu") as string,
      dataKeys: ["cpu"],
      dataMaxValueKey: 1,
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
    },
    // Swap usage current
    {
      id: "swap_current",
      type: "progress",
      legend: t("proxmox:swap") as string,
      dataKeys: ["swap.used"],
      dataMaxValueKey: "swap.total",
      lastItem: true,
      dataValueMultiplier: getBytesToGBMultiplier(),
      dataValueUnit: "GB",
    },
  ];
};

const getProxmoxChartOptions = (t: TFunction): ProxmoxChartProps[] => {
  return [
    // NOTE: The following are historical data
    // CPU
    {
      id: "cpuUsage",
      type: "line",
      legend: t("proxmox:cpuUsage") as string,
      dataKeys: ["cpu"],
      firstItem: true,
    },
    // Server Load
    {
      id: "serverLoad",
      type: "line",
      legend: t("proxmox:serverLoad") as string,
      dataKeys: ["loadavg"],
    },
    // Memory usage
    {
      id: "memoryUsage",
      type: "line",
      legend: t("proxmox:memoryUsage") as string,
      dataKeys: ["memused", "memtotal"],
    },
    // Network traffic
    {
      id: "networkTraffic",
      type: "line",
      legend: t("proxmox:networkTraffic") as string,
      dataKeys: ["netin", "netout"],
      lastItem: true,
    },
  ];
};

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

const ProxmoxSummary: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [selectedNode, setSelectedNode] = React.useState<string | undefined>(
    undefined
  );

  const params = useGlobalSearchParams();

  const clusterStatus = useGetClusterResources({
    query: {
      select: (response) => {
        // Filter data - Only node data is needed
        return response.data?.filter((data) => data.type === "node");
      },
      onSuccess: (data) => {
        // Set the first node as the selected node
        setSelectedNode(data?.[0].node);
      },
      refetchInterval: 5000,
      enabled: params.path === HOME,
    },
  });

  const nodeStatus = useGetNodesSingleStatus(`${selectedNode}`, {
    query: {
      select: (response) => response.data,
      enabled: selectedNode !== undefined,
      refetchInterval: 5000,
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
    },
    {
      query: {
        select: (response) => response.data,
        onSuccess: (data) => {},
        enabled: selectedNode !== undefined,
      },
    }
  );

  useQueryLoadingSpinner(clusterStatus);

  return (
    <YStack flex={1}>
      <FlashList
        data={[
          ...getProxmoxProgressBarOptions(t),
          ...getProxmoxChartOptions(t),
        ]}
        extraData={[selectedNode]}
        renderItem={({ item }) => (
          <ProxmoxSummaryChart
            props={item}
            nodeData={nodeStatus.data!}
            rrdData={nodeHistoricData.data!}
          />
        )}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <XStack flex={1} height="$8">
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
                    borderColor={
                      item.node === selectedNode ? "$gray7" : "$gray1"
                    }
                    borderWidth="$1.5"
                    padding="$2"
                    animation="delay"
                    marginBottom="$2"
                    borderRadius="$6"
                    onPress={() => setSelectedNode(item.node)}
                  >
                    <XStack
                      flex={1}
                      justifyContent="center"
                      alignItems="center"
                    >
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
                    <XStack
                      flex={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <ClusterResourceTypeIcon type="node" />
                      <H4 color="$color" marginLeft="$2">
                        node
                      </H4>
                    </XStack>
                  </Button>
                }
              />
            </XStack>
            <XStack minHeight="$10" height="auto" marginTop="$2">
              <FlashList
                data={getProxmoxSummaryDetailOptions(
                  t,
                  getClusterStatusForNode(`${selectedNode}`),
                  nodeStatus.data!
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
              />
            </XStack>
          </>
        }
        ListFooterComponent={<XStack height="$5" />}
      />
    </YStack>
  );
};

export default ProxmoxSummary;
