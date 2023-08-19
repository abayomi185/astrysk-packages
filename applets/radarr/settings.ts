import { Alert } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { Router, SettingsOptionProps } from "@astrysk/types";
import { Applets, Screens } from "@astrysk/constants";

import { faServer, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useRadarrStore } from "./store";
import i18next from "i18next";
import { RadarrSettingsKeys } from "./types";

export const RadarrSettingsOptions = (
  router: Router
): (string | SettingsOptionProps)[] => [
  Applets.RADARR,
  {
    key: RadarrSettingsKeys.Server,
    type: "label",
    icon: faServer,
    iconSize: 22,
    value: useRadarrStore.getState().baseURL as string,
    firstItem: true,
  },
  {
    key: RadarrSettingsKeys.DeleteCache,
    type: "action",
    icon: faDatabase,
    iconSize: 22,
    onPress: () => {
      const alertTitle = i18next.t("radarr:deleteCache");
      const alertMessage = i18next.t("radarr:deleteCacheMessage");
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
            Image.clearDiskCache();
            useRadarrStore.setState({
              radarrMovieCache: {},
              radarrMovieFileCache: {},
              radarrQualityProfiles: [],
              radarrLanguageProfiles: [],
            });
          },
          style: "destructive",
        },
      ]);
    },
    lastItem: true,
  },
];
