import React from "react";
import { useNavigation } from "expo-router";
import { SeriesResource } from "../../api";
import { TabContext } from "@astrysk/types";
import { useSonarrDetailHeader } from "../useHeader";
import { useTranslation } from "react-i18next";
import { YStack } from "tamagui";

const SonarrAllEpisodesDetail: React.FC<{
  forwardedData: SeriesResource;
  tabContext: TabContext;
}> = ({ forwardedData, tabContext }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  useSonarrDetailHeader(navigation, t("sonarr:allEpisodes"));

  return <YStack height="$5" backgroundColor="red"></YStack>;
};

export default SonarrAllEpisodesDetail;
