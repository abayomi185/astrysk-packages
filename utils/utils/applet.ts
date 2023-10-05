import * as Assets from "@astrysk/assets";
import { DefaultAppletLogo, DefaultAppletIcon } from "./default";
import { Applets } from "@astrysk/constants";
import { TFunction } from "i18next";

export const getAppletIcon = (
  applet: string | undefined
): { AppletIcon: any; bannerColor: string } => {
  switch (applet) {
    case Applets.JELLYFIN:
      return { AppletIcon: Assets.JellyfinAssets.Logo, bannerColor: "#000B25" };
    case Applets.SONARR:
      return { AppletIcon: Assets.SonarrAssets.Logo, bannerColor: "#213E44" };
    case Applets.RADARR:
      return { AppletIcon: Assets.RadarrAssets.Logo, bannerColor: "#483C1F" };
    case Applets.PROXMOX:
      return { AppletIcon: Assets.ProxmoxAssets.Logo, bannerColor: "#432C16" };
    default:
      return { AppletIcon: DefaultAppletIcon, bannerColor: "#000000" };
  }
};

export const getAppletTitle = (t: TFunction, applet: string) => {
  return t(`${applet}:${applet}`);
};
