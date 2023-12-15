import * as Assets from "@astrysk/assets";
import { DefaultAppletLogo, DefaultAppletIcon } from "./default";
import { Applets } from "@astrysk/constants";
import { TFunction } from "i18next";

export const getAppletLogo = (applet: string) => {
  switch (applet) {
    case Applets.JELLYFIN:
      return Assets.JellyfinAssets.Logo;
    case Applets.SONARR:
      return Assets.SonarrAssets.Logo;
    case Applets.RADARR:
      return Assets.RadarrAssets.LogoDark;
    case Applets.LIDARR:
      return Assets.LidarrAssets.Logo;
    case Applets.PLEX:
      return Assets.PlexAssets.Logo;
    case Applets.PROXMOX:
      return Assets.ProxmoxAssets.Logo;
    case Applets.DOCKER:
      return Assets.DockerAssets.Logo;
    case Applets.PHOTOPRISM:
      return Assets.PhotoprismAssets.Logo;
    case Applets.ADGUARD_HOME:
      return Assets.AdguardHomeAssets.Logo;
    case Applets.FIREFLY_III:
      return Assets.FireflyIIIAssets.Logo;
    case Applets.OLLAMA:
      return Assets.OllamaAssets.Logo;
    default:
      return Assets.RadarrAssets.LogoDark;
  }
};

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
    case Applets.OLLAMA:
      return { AppletIcon: Assets.OllamaAssets.Logo, bannerColor: "#222222" };
    default:
      return { AppletIcon: DefaultAppletIcon, bannerColor: "#000000" };
  }
};

export const getAppletTitle = (t: TFunction, applet: string) => {
  return t(`${applet}:${applet}`);
};
