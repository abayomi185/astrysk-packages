import * as Assets from "@astrysk/assets";
// import { DefaultAppletLogo, DefaultAppletIcon } from "@astrysk/components"; // Cycle
import { DefaultAppletLogo, DefaultAppletIcon } from "./default";
import { Applets } from "@astrysk/constants";
import { TFunction } from "i18next";

export const getAppletLogo = (applet: string | undefined) => {
  switch (applet) {
    case Applets.JELLYFIN:
      return Assets.JellyfinAssets.Applet_Large_Logo;
    case Applets.SONARR:
      return Assets.SonarrAssets.Applet_Large_Logo;
    case Applets.RADARR:
      return Assets.RadarrAssets.Applet_Large_Logo;
    default:
      return DefaultAppletLogo;
  }
};

export const getAppletIcon = (applet: string | undefined) => {
  switch (applet) {
    case Applets.JELLYFIN:
      return Assets.JellyfinAssets.Logo;
    case Applets.SONARR:
      return Assets.SonarrAssets.Logo;
    case Applets.RADARR:
      return Assets.RadarrAssets.Logo;
    default:
      return DefaultAppletIcon;
  }
};

export const getAppletTitle = (t: TFunction, applet: string) => {
  return t(`${applet}:${applet}`);
};
