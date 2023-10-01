import { useAppStateStore } from "@astrysk/stores";
import { ContextMenuOptions, isTestflightBuild } from "@astrysk/utils";
import { TFunction } from "i18next";
import { useRadarrStore } from "./store";
import { RadarrCommands } from "./types";
import { postApiV3Command } from "./api";

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
      ...(isTestflightBuild
        ? [
            {
              index: 1,
              title: `${t("radarr:searchAllMissing")}`,
              systemIcon: "magnifyingglass.circle",
            },
          ]
        : []),
    ];
  },
  getContextHandler(t: TFunction, indexPath: number[]): void {
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
          postApiV3Command({
            name: RadarrCommands.MISSING_MOVIES_SEARCH,
          })
            .then((_res) => {
              useAppStateStore.setState({
                setToast: {
                  title: t("radarr:alert:startedSearchForAllMissing"),
                  options: {
                    type: "done",
                  },
                },
              });
            })
            .catch((err) => {
              useAppStateStore.setState({
                setToast: {
                  title: t("radarr:alert:failedSearchForAllMissing"),
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
