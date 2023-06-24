import { Applet } from "@astrysk/types";

import JellyfinAuth from "./screens/auth";
import JellyfinHome from "./screens/home";
import JellyfinSearch from "./screens/search";
import JellyfinDetail from "./screens/detail";
import JellyfinModal from "./screens/modal";
import JellyfinFullScreenModal from "./screens/fullScreenModal";
import { configureJellyfin } from "./utils";
import { JellyfinContextMenuOptions } from "./context";
import { JellyfinSettingsOptions } from "./settings";

export const Jellyfin: Applet = {
  configure: configureJellyfin,
  configureView: JellyfinAuth,
  homeView: JellyfinHome,
  searchView: JellyfinSearch,
  settingsOptions: JellyfinSettingsOptions,
  detailView: JellyfinDetail,
  modalView: JellyfinModal,
  fullScreenModalView: JellyfinFullScreenModal,
  contextMenu: JellyfinContextMenuOptions,
};

export default Jellyfin;
