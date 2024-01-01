import React from "react";
import { ContextMenuOptions } from "@astrysk/utils";
import { SettingsOptionProps } from "./settings";
import { Router } from "./router";
import { ColorTokens } from "tamagui";

// Make a generic type that defines the class
export interface Applet {
  configure: () => boolean;
  deconfigure?: () => void;
  loadLocales?: () => void;
  configureView: React.FC;
  homeView: React.FC;
  searchView: React.FC;
  // settingsView: React.FC; // WARN: Not currently used
  settingsOptions: (router: Router) => (string | SettingsOptionProps)[];
  detailView: React.FC;
  modalView?: React.FC;
  fullScreenModalView?: React.FC;
  fullScreenDetailView?: React.FC;
  contextMenu: ContextMenuOptions;
  colors: AppletColors; // To change accent colour of tab bar
}

export interface BaseAppletColors {
  primary: string | ColorTokens;
  secondary: string | ColorTokens;
  accentColor: string | ColorTokens;
}

export interface ExtendedAppletColors extends BaseAppletColors {
  primaryColorDark?: string | ColorTokens;
  primaryColorLight?: string | ColorTokens;
  accentColorDark?: string | ColorTokens;
  accentColorLight?: string | ColorTokens;
  [key: string]: string | ColorTokens | undefined;
}

export type AppletColors = BaseAppletColors | ExtendedAppletColors;
