import { useAppStateStore } from "@astrysk/stores";
import { ContextMenuOptions } from "@astrysk/utils";
import { TFunction } from "i18next";
import { useRadarrStore } from "./store";

// This is used to determine the index of the applet in the context menu
const APPLET_INDEX = 1;

export const RadarrContextMenuOptions: ContextMenuOptions = {
  getContextActions(t: TFunction): any[] {
    return [
      {
        index: 0,
        title: `${t("common:disconnectServer")}`,
        systemIcon: "x.circle",
        destructive: true,
      },
      {
        index: 1,
        title: `${t("radarr:searchAllMissing")}`,
        systemIcon: "magnifyingglass.circle",
      },
    ];
  },
  getContextHandler(indexPath: number[]): void {
    if (indexPath[0] === APPLET_INDEX)
      switch (indexPath[1]) {
        case 0:
          useRadarrStore.setState({
            isConfigured: false,
            baseURL: undefined,
            token: undefined,
            customHeaders: undefined,
          });
          useAppStateStore.setState({ activeApplet: undefined });
          break;
        case 1:
          console.log("Search all missing");
          break;
      }
  },
};
