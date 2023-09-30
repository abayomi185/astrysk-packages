import i18next from "i18next";
import { Applet } from "@astrysk/types";

import JellyfinAuth from "./screens/auth";
import JellyfinHome from "./screens/home";
import JellyfinSearch from "./screens/search";
import JellyfinDetail from "./screens/detail";
import JellyfinModal from "./screens/modal";
import JellyfinFullScreenModal from "./screens/fullScreenModal";
import { configureJellyfin, deConfigureJellyfin } from "./utils";
import jellyfinLocales from "./locales";
import { JellyfinContextMenuOptions } from "./context";
import { JellyfinSettingsOptions } from "./settings";
import { jellyfinColors } from "./colors";

const Jellyfin: Applet = {
  loadLocales: () => {
    i18next.addResourceBundle("en", "jellyfin", jellyfinLocales, true);
  },
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
