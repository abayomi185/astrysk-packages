import React from "react";
import { useRouter } from "expo-router";
import { RefreshControl } from "react-native";
import { Image, ImageSource } from "expo-image";
import { YStack, Text, useTheme, XStack, H5, Button } from "tamagui";
import { useQueryLoadingSpinner } from "@astrysk/utils";
import { EmptyList, SectionTitle } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import { useProxmoxStore } from "../../store";
import { ProxmoxDetailScreenContext } from "../../types";
import { Actions } from "@astrysk/constants";
import { TabContext } from "@astrysk/types";
import { FlashList } from "@shopify/flash-list";
import {
  GetClusterResourcesResponseResponseDataItem,
  useGetClusterResources,
  useGetClusterStatus,
} from "../../api";
import { proxmoxColors } from "../../colors";
import { ProxmoxSummaryCharts } from "../detail/charts";

const ProxmoxSummary: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const baseURL = useProxmoxStore.getState().baseURL as string;
  const token = useProxmoxStore.getState().token as string;

  const clusterStatus = useGetClusterStatus({
    query: {
      select: (response) => response.data,
    },
  });

  useQueryLoadingSpinner(clusterStatus);

  return (
    <YStack flex={1}>
      <FlashList
        data={[]}
        renderItem={({ item, index }) => <ProxmoxSummaryCharts data={item} />}
        extraData={new Date()}
        estimatedItemSize={100}
        ListHeaderComponent={
          <YStack flex={1} height="$8" backgroundColor="green">
            <FlashList
              horizontal={true}
              data={clusterStatus.data}
              extraData={new Date()}
              renderItem={({ item }) => (
                <Button
                  flex={1}
                  width="$13"
                  marginVertical="$2"
                  backgroundColor="green"
                >
                  <XStack flex={1} justifyContent="center" alignItems="center">
                    <Text color="white">{item?.name}</Text>
                  </XStack>
                </Button>
              )}
              estimatedItemSize={100}
              ListHeaderComponent={<XStack width="$0.75" />}
            />
          </YStack>
        }
      />
    </YStack>
  );
};

export default ProxmoxSummary;
