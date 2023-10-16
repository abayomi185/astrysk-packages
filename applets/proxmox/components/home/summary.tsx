import React from "react";
import { useRouter } from "expo-router";
import { RefreshControl } from "react-native";
import { Image, ImageSource } from "expo-image";
import { YStack, Text, useTheme, XStack, H5, Button } from "tamagui";
import { useLoadingSpinner } from "@astrysk/utils";
import { EmptyList, SectionTitle } from "@astrysk/components";
import { useTranslation } from "react-i18next";
import { useProxmoxStore } from "../../store";
import { ProxmoxDetailScreenContext } from "../../types";
import { Actions } from "@astrysk/constants";
import { TabContext } from "@astrysk/types";
import { FlashList } from "@shopify/flash-list";
import { useGetClusterResources } from "../../api";

const ProxmoxSummary: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const baseURL = useProxmoxStore.getState().baseURL as string;
  const token = useProxmoxStore.getState().token as string;

  const clusterResources = useGetClusterResources({
    query: {
      onSuccess: (data) => {},
      onError: (error) => {},
    },
  });

  useLoadingSpinner(ProxmoxSummary.name);

  return (
    <YStack flex={1}>
      <FlashList data={[]} renderItem={({ item, index }) => <></>} />
    </YStack>
  );
};

export default ProxmoxSummary;
