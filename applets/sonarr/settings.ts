import { Alert } from "react-native";
import { useNavigation } from "expo-router";
import { Router, SettingsOptionProps } from "@astrysk/types";
import { Applets, Screens } from "@astrysk/constants";

import { faServer, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useSonarrStore } from "./store";
import i18next from "i18next";
import { SonarrSettingsKeys } from "./types";

export const SonarrSettingsOptions = (
  router: Router
): (string | SettingsOptionProps)[] => [
  Applets.SONARR,
  {
    key: SonarrSettingsKeys.Server,
    type: "action",
    icon: faServer,
    iconSize: 22,
    selectionHint: useSonarrStore.getState().baseURL as string,
    onPress: () => {
      // router.push({
      //   pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      //   params: {
      //     context: JellyfinDetailScreenContext.SettingsOption,
      //     itemId: JellyfinSettingsKeys.Server,
      //   } as JellyfinDetailScreenProps,
      // });
    },
  },
  {
    key: SonarrSettingsKeys.DeleteCache,
    type: "action",
    icon: faDatabase,
    iconSize: 22,
    onPress: () => {
      const alertTitle = i18next.t("sonarr:deleteCache");
      const alertMessage = i18next.t("sonarr:deleteCacheMessage");
      const alertOkText = i18next.t("common:ok");
      const alertCancelText = i18next.t("common:cancel");

      Alert.alert(alertTitle, alertMessage, [
        {
          text: alertCancelText,
          style: "default",
        },
        {
          text: alertOkText,
          onPress: () => {
            useSonarrStore.setState({
              sonarrSeriesCache: {},
              sonarrEpisodeCache: {},
              sonarrEpisodeFileCache: {},
              sonarrQualityProfiles: [],
              sonarrLanguageProfiles: [],
            });
          },
          style: "destructive",
        },
      ]);
    },
  },
];
