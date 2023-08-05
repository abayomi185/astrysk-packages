import React, { Suspense } from "react";
import { useSearchParams, useNavigation } from "expo-router";

import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";

import { useSonarrStore } from "../store";
import { SettingsOption, SettingsOptionHeader } from "@astrysk/components";
import { SettingsOptionProps } from "@astrysk/types";
import { SonarrDetailScreenContext, SonarrDetailScreenProps } from "../types";

import { Text, ScrollView, XStack, YStack } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { onItemLayout } from "@astrysk/utils";
import { useSonarrModalHeader } from "../components/useHeader";

// import { roundToNearestStandardResolution } from "../utils";

const SonarrModal = () => {
  // const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useSearchParams() as SonarrDetailScreenProps;

  const baseURL = useSonarrStore.getState().baseURL as string;
  // const token = useSonarrStore.getState().token;

  // const serverId = useSonarrStore.getState().userDetails?.ServerId as string;

  // NOTE: SERIES DESCRIPTION
  if (params.context === SonarrDetailScreenContext.SeriesDescription) {
    const seriesId = parseInt(params?.itemId as string);

    const data = useSonarrStore
      .getState()
      .sonarrCache?.[baseURL]?.seriesCache?.find(
        (item) => item.id === seriesId
      );

    useSonarrModalHeader(navigation, data?.title as string);

    return (
      <ScrollView height="100%" nestedScrollEnabled>
        <Text
          color="$gray11"
          paddingHorizontal="$4"
          paddingVertical="$4"
          fontSize={18}
          lineHeight={24}
        >
          {data?.overview}
        </Text>
      </ScrollView>
    );
  }

  return null;
};

export default SonarrModal;
