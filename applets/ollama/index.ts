import i18next from "i18next";
import { Applet } from "@astrysk/types";

import OllamaAuth from "./screens/auth";
import OllamaHome from "./screens/home";
import OllamaSearch from "./screens/search";
import OllamaDetail from "./screens/detail";
import OllamaModal from "./screens/modal";
import { configureOllama, deConfigureOllama } from "./utils";
import ollamaLocales from "./locales";
import { OllamaContextMenuOptions } from "./context";
import { OllamaSettingsOptions } from "./settings";
import { ollamaColors } from "./colors";

const Ollama: Applet = {
  loadLocales: () => {
    i18next.addResourceBundle("en", "ollama", ollamaLocales, true);
  },
  configure: configureOllama,
  deconfigure: deConfigureOllama,
  configureView: OllamaAuth,
  homeView: OllamaHome,
  searchView: OllamaSearch,
  settingsOptions: OllamaSettingsOptions,
  detailView: OllamaDetail,
  modalView: OllamaModal,
  fullScreenDetailView: OllamaDetail,
  contextMenu: OllamaContextMenuOptions,
  colors: ollamaColors,
};

export default Ollama;
