import i18next from "i18next";
import { Applet } from "@astrysk/types";

import SonarrAuth from "./screens/auth";
import SonarrHome from "./screens/home";
import SonarrSearch from "./screens/search";
import SonarrDetail from "./screens/detail";
import SonarrModal from "./screens/modal";
import { configureSonarr, deConfigureSonarr } from "./utils";
import sonarrLocales from "./locales";
import { SonarrContextMenuOptions } from "./context";
import { SonarrSettingsOptions } from "./settings";
import { sonarrColors } from "./colors";

const Sonarr: Applet = {
  loadLocales: () => {
    i18next.addResourceBundle("en", "sonarr", sonarrLocales, true);
  },
  configure: configureSonarr,
  deconfigure: deConfigureSonarr,
  configureView: SonarrAuth,
  homeView: SonarrHome,
  searchView: SonarrSearch,
  settingsOptions: SonarrSettingsOptions,
  detailView: SonarrDetail,
  modalView: SonarrModal,
  contextMenu: SonarrContextMenuOptions,
  colors: sonarrColors,
};

export default Sonarr;
