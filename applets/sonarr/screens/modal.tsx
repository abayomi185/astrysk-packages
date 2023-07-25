import React, { Suspense } from "react";
import { useSearchParams, useNavigation } from "expo-router";

import { useTranslation } from "react-i18next";
import { FlashList } from "@shopify/flash-list";

import { useSonarrStore } from "../store";
import { SettingsOption, SettingsOptionHeader } from "@astrysk/components";
import { SettingsOptionProps } from "@astrysk/types";
import { SonarrDetailScreenProps } from "../types";

import { Text, ScrollView, XStack, YStack } from "tamagui";
import { Image, ImageSource } from "expo-image";
import { onItemLayout } from "@astrysk/utils";

// import { roundToNearestStandardResolution } from "../utils";

const SonarrModal = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const params = useSearchParams() as SonarrDetailScreenProps;

  const baseURL = useSonarrStore.getState().baseURL;
  const token = useSonarrStore.getState().token;

  const userId = useSonarrStore.getState().userDetails?.Id as string;

  const serverId = useSonarrStore.getState().userDetails?.ServerId as string;

  return <></>;
};
