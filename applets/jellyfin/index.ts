import { Applet } from "@astrysk/types";

import JellyfinAuth from "./screens/auth";
import JellyfinHome from "./screens/home";
import JellyfinSearch from "./screens/search";
import JellyfinDetail from "./screens/detail";
import JellyfinModal from "./screens/modal";
import JellyfinFullScreenModal from "./screens/fullScreenModal";
import { configureJellyfin, deConfigureJellyfin } from "./utils";
import { JellyfinContextMenuOptions } from "./context";
import { JellyfinSettingsOptions } from "./settings";
import { jellyfinColors } from "./colors";

export const Jellyfin: Applet = {
  configure: configureJellyfin,
  deconfigure: deConfigureJellyfin,
  configureView: JellyfinAuth,
  homeView: JellyfinHome,
  searchView: JellyfinSearch,
  settingsOptions: JellyfinSettingsOptions,
  detailView: JellyfinDetail,
  modalView: JellyfinModal,
  fullScreenModalView: JellyfinFullScreenModal,
  contextMenu: JellyfinContextMenuOptions,
  colors: jellyfinColors,
};

export default Jellyfin;
