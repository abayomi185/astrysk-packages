import i18next from "i18next";
import { Applet } from "@astrysk/types";

import ProxmoxAuth from "./screens/auth";
import ProxmoxHome from "./screens/home";
import ProxmoxSearch from "./screens/search";
import ProxmoxDetail from "./screens/detail";
import ProxmoxModal from "./screens/modal";
import { configureProxmox, deConfigureProxmox } from "./utils";
import proxmoxLocales from "./locales";
import { ProxmoxContextMenuOptions } from "./context";
import { ProxmoxSettingsOptions } from "./settings";
import { proxmoxColors } from "./colors";

const Proxmox: Applet = {
  loadLocales: () => {
    i18next.addResourceBundle("en", "proxmox", proxmoxLocales, true);
  },
  configure: configureProxmox,
  deconfigure: deConfigureProxmox,
  configureView: ProxmoxAuth,
  homeView: ProxmoxHome,
  searchView: ProxmoxSearch,
  settingsOptions: ProxmoxSettingsOptions,
  detailView: ProxmoxDetail,
  modalView: ProxmoxModal,
  contextMenu: ProxmoxContextMenuOptions,
  colors: proxmoxColors,
};

export default Proxmox;
