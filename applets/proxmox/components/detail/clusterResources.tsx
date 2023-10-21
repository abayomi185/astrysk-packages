import React from "react";
import { RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { Button, H3, XStack, YStack, Text } from "tamagui";
import { GetClusterResourcesResponseResponseDataItem } from "../../api";
import { FlashList } from "@shopify/flash-list";
import { proxmoxColors } from "../../colors";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { EmptyList } from "@astrysk/components";
import { UseQueryResult } from "@tanstack/react-query";
import { goToProxmoxDetailScreen } from "../../utils";
import { TabContext } from "@astrysk/types";
import { ProxmoxDetailScreenContext } from "../../types";
import {
  ClusterResourceStatusIcon,
  ClusterResourceTypeIcon,
} from "./clusterResource";

const ClusterResourcesListItem: React.FC<{
  t: TFunction;
  data: GetClusterResourcesResponseResponseDataItem;
}> = ({ t, data }) => {
  const router = useRouter();

  const getComponentBody = () => {
    if (data.type === "qemu") {
      return (
        <>
          <YStack width="$1.5" alignSelf="flex-start" paddingTop="$1.5">
            <ClusterResourceTypeIcon type={data.type} />
            <ClusterResourceStatusIcon status={data.status} />
          </YStack>
          <YStack flex={1} marginLeft="$3">
            <H3>{data.vmid}</H3>
            <Text>{data.name}</Text>
            <Text color="$gray10" marginTop="$1">
              {t(`proxmox:${data.status}`)}
            </Text>
          </YStack>
        </>
      );
    } else if (data.type === "lxc") {
      return (
        <>
          <YStack width="$1.5" alignSelf="flex-start" paddingTop="$1.5">
            <ClusterResourceTypeIcon type={data.type} />
            <ClusterResourceStatusIcon status={data.status} />
          </YStack>
          <YStack flex={1} marginLeft="$3">
            <H3>{data.vmid}</H3>
            <Text>{data.name}</Text>
            <Text color="$gray10" marginTop="$1">
              {t(`proxmox:${data.status}`)}
            </Text>
          </YStack>
        </>
      );
    } else if (data.type === "node") {
      return (
        <>
          <XStack width="$1.5" alignSelf="flex-start" paddingTop="$1.5">
            <ClusterResourceTypeIcon type={data.type} />
          </XStack>
          <YStack flex={1} marginLeft="$3">
            <H3>{data.node}</H3>
            <Text color="$gray10" marginTop="$1">
              {data.status}
            </Text>
          </YStack>
        </>
      );
    } else if (data.type === "storage") {
      return (
        <>
          <XStack width="$1.5" alignSelf="flex-start" paddingTop="$1.5">
            <ClusterResourceTypeIcon type={data.type} />
          </XStack>
          <YStack flex={1} marginLeft="$3">
            <H3>{data.storage}</H3>
            <Text color="$gray10" marginTop="$1">
              {data.content}
            </Text>
          </YStack>
        </>
      );
    } else if (data.type === "sdn") {
      return (
        <>
          <XStack width="$1.5" alignSelf="flex-start" paddingTop="$1.5">
            <ClusterResourceTypeIcon type={data.type} />
          </XStack>
          <YStack flex={1} marginLeft="$3">
            <H3>{data.sdn}</H3>
          </YStack>
        </>
      );
    }
  };

  return (
    <Button
      flex={1}
      height="auto"
      padding="$2"
      animation="delay"
      marginBottom="$2"
      borderRadius="$6"
      backgroundColor="$gray1"
      onPress={() =>
        goToProxmoxDetailScreen({
          router,
          searchItemId: data.id as string,
          tabContext: TabContext.Search,
          screenContext: ProxmoxDetailScreenContext.SearchItem,
        })
      }
    >
      <XStack
        flex={1}
        paddingHorizontal="$3"
        paddingVertical="$2"
        alignItems="center"
      >
        {getComponentBody()}
        {data.type !== "node" && (
          <XStack width="$2" justifyContent="flex-end">
            <Text numberOfLines={1} ellipsizeMode="tail">
              {data.node}
            </Text>
          </XStack>
        )}
      </XStack>
    </Button>
  );
};

const ClusterResources: React.FC<{
  data: GetClusterResourcesResponseResponseDataItem[];
  queryStatus: UseQueryResult<any, unknown>["status"];
  refetch: () => void;
}> = ({ data, queryStatus, refetch }) => {
  const { t } = useTranslation();

  const refetchClusterResources = () => {
    refetch();
  };

  return (
    <YStack flex={1}>
      <YStack flex={1}>
        <FlashList
          contentContainerStyle={{ paddingHorizontal: "7" }}
          data={data ?? []}
          renderItem={({ item }) => (
            <ClusterResourcesListItem t={t} data={item} />
          )}
          estimatedItemSize={100}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={refetchClusterResources}
              tintColor={proxmoxColors.accentColor}
            />
          }
          ListEmptyComponent={
            <EmptyList
              queryStatus={queryStatus}
              text={t("proxmox:noResourcesFound")}
              accentColor={proxmoxColors.accentColor}
            />
          }
          ListFooterComponent={<XStack height="$2" />}
        />
      </YStack>
    </YStack>
  );
};

export default ClusterResources;
