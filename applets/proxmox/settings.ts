import { Alert } from "react-native";
import { Image } from "expo-image";
import { Router, SettingsOptionProps } from "@astrysk/types";
import { Applets } from "@astrysk/constants";

import { faServer, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useProxmoxStore } from "./store";
import i18next from "i18next";
import { ProxmoxSettingsKeys } from "./types";
import { API2_JSON_PATH } from "./utils";

export const ProxmoxSettingsOptions = (
  router: Router
): (string | SettingsOptionProps)[] => [
  Applets.PROXMOX,
  {
    key: ProxmoxSettingsKeys.Server,
    type: "label",
    icon: faServer,
    iconSize: 22,
    value: (useProxmoxStore.getState().baseURL as string).replace(
      API2_JSON_PATH,
      ""
    ),
    firstItem: true,
  },
  {
    key: ProxmoxSettingsKeys.DeleteCache,
    type: "action",
    icon: faDatabase,
    iconSize: 22,
    onPress: () => {
      const alertTitle = i18next.t("proxmox:deleteCache");
      const alertMessage = i18next.t("proxmox:deleteCacheMessage");
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
            useProxmoxStore.setState({
              // proxmoxSeriesCache: {},
              // proxmoxEpisodeCache: {},
              // proxmoxEpisodeFileCache: {},
              // proxmoxQualityProfiles: [],
              // proxmoxLanguageProfiles: [],
            });
          },
          style: "destructive",
        },
      ]);
    },
    lastItem: true,
  },
];
