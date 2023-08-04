import { Applet } from "@astrysk/types";

import SonarrAuth from "./screens/auth";
import SonarrHome from "./screens/home";
import SonarrSearch from "./screens/search";
import SonarrDetail from "./screens/detail";
import SonarrModal from "./screens/modal";
import { configureSonarr, deConfigureSonarr } from "./utils";
import { SonarrContextMenuOptions } from "./context";
import { SonarrSettingsOptions } from "./settings";
import { sonarrColors } from "./colors";

export const Sonarr: Applet = {
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
