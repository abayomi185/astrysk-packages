import { useAppStateStore } from "@astrysk/stores";
import { ContextMenuOptions } from "@astrysk/utils";
import { TFunction } from "i18next";
import { useSonarrStore } from "./store";
import { postApiV3Command } from "./api";
import { SonarrCommands } from "./types";

// This is used to determine the index of the applet in the context menu
const APPLET_INDEX = 1;

export const SonarrContextMenuOptions: ContextMenuOptions = {
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
  getContextHandler(t: TFunction, indexPath: number[]): void {
    if (indexPath[0] === APPLET_INDEX)
      switch (indexPath[1]) {
        case 0:
          useSonarrStore.setState({
            isConfigured: false,
            baseURL: undefined,
            token: undefined,
            customHeaders: undefined,
          });
          useAppStateStore.setState({ activeApplet: undefined });
          break;
        case 1:
          postApiV3Command({
            name: SonarrCommands.MISSING_EPISODE_SEARCH,
          })
            .then((_res) => {
              useAppStateStore.setState({
                setToast: {
                  title: t("sonarr:alert:startedSearchForAllMissing"),
                  options: {
                    type: "done",
                  },
                },
              });
            })
            .catch((err) => {
              useAppStateStore.setState({
                setToast: {
                  title: t("sonarr:alert:failedSearchForAllMissing"),
                  options: {
                    type: "done",
                    message: err.message,
                  },
                },
              });
            });
          break;
      }
  },
};
