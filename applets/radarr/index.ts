import i18next from "i18next";
import { Applet } from "@astrysk/types";

import RadarrAuth from "./screens/auth";
import RadarrHome from "./screens/home";
import RadarrSearch from "./screens/search";
import RadarrDetail from "./screens/detail";
import RadarrModal from "./screens/modal";
import { configureRadarr, deConfigureRadarr } from "./utils";
import radarrLocales from "./locales";
import { RadarrContextMenuOptions } from "./context";
import { RadarrSettingsOptions } from "./settings";
import { radarrColors } from "./colors";

const Radarr: Applet = {
  loadLocales: () => {
    i18next.addResourceBundle("en", "radarr", radarrLocales, true);
  },
  configure: configureRadarr,
  deconfigure: deConfigureRadarr,
  configureView: RadarrAuth,
  homeView: RadarrHome,
  searchView: RadarrSearch,
  settingsOptions: RadarrSettingsOptions,
  detailView: RadarrDetail,
  modalView: RadarrModal,
  contextMenu: RadarrContextMenuOptions,
  colors: radarrColors,
};

export default Radarr;
