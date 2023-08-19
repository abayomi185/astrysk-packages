import { Applet } from "@astrysk/types";

import RadarrAuth from "./screens/auth";
import RadarrHome from "./screens/home";
import RadarrSearch from "./screens/search";
import RadarrDetail from "./screens/detail";
import RadarrModal from "./screens/modal";
import { configureRadarr, deConfigureRadarr } from "./utils";
import { RadarrContextMenuOptions } from "./context";
import { RadarrSettingsOptions } from "./settings";
import { radarrColors } from "./colors";

export const Radarr: Applet = {
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
