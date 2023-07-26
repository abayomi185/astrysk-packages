import { Applet } from "@astrysk/types";

import SonarrAuth from "./screens/auth";
import SonarrHome from "./screens/home";
import SonarrSearch from "./screens/search";
import SonarrDetail from "./screens/detail";
import SonarrModal from "./screens/modal";
import { configureSonarr } from "./utils";
import { SonarrContextMenuOptions } from "./context";
import { SonarrSettingsOptions } from "./settings";

export const Sonarr: Applet = {
  configure: configureSonarr,
  configureView: SonarrAuth,
  homeView: SonarrHome,
  searchView: SonarrSearch,
  settingsOptions: SonarrSettingsOptions,
  detailView: SonarrDetail,
  modalView: SonarrModal,
  contextMenu: SonarrContextMenuOptions,
  // accentColor: config.colors.sonarr,
};

export default Sonarr;
