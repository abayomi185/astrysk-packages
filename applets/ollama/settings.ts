import { Alert } from "react-native";
import { Router, SettingsOptionProps } from "@astrysk/types";
import { Applets } from "@astrysk/constants";

import { faServer, faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useOllamaStore } from "./store";
import i18next from "i18next";
import { OllamaSettingsKeys } from "./types";

export const OllamaSettingsOptions = (
  router: Router
): (string | SettingsOptionProps)[] => [
  Applets.OLLAMA,
  {
    key: OllamaSettingsKeys.Server,
    type: "label",
    icon: faServer,
    iconSize: 22,
    value: useOllamaStore.getState().baseURL as string,
    firstItem: true,
  },
  {
    key: OllamaSettingsKeys.DeleteCache,
    type: "action",
    icon: faDatabase,
    iconSize: 22,
    onPress: () => {
      const alertTitle = i18next.t("ollama:deleteCache");
      const alertMessage = i18next.t("ollama:deleteCacheMessage");
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
            useOllamaStore.setState({
              ollamaCache: {},
            });
          },
          style: "destructive",
        },
      ]);
    },
    lastItem: true,
  },
];
