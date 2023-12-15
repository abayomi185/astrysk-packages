import { useAppStateStore } from "@astrysk/stores";
import { ContextMenuOptions } from "@astrysk/utils";
import { TFunction } from "i18next";
import { useOllamaStore } from "./store";

const APPLET_INDEX = 1;

export const OllamaContextMenuOptions: ContextMenuOptions = {
  getContextActions(t: TFunction): any[] {
    return [
      {
        index: 0,
        title: `${t("common:disconnectServer")}`,
        systemIcon: "x.circle",
        destructive: true,
      },
    ];
  },
  getContextHandler(t: TFunction, indexPath: number[]): void {
    if (indexPath[0] === APPLET_INDEX)
      switch (indexPath[1]) {
        case 0:
          useOllamaStore.setState({
            isConfigured: false,
            baseURL: undefined,
            token: undefined,
            customHeaders: undefined,
          });
          useAppStateStore.setState({ activeApplet: undefined });
          break;
      }
  },
};
