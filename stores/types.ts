import { Applet, ViewType } from "@astrysk/types";
import { ColorSchemeName } from "react-native";

export interface votedAppletState {
  [applet: string]: boolean;
}

export interface AppState {
  appearance?: ColorSchemeName;
  // Applets
  applets: { [key: string]: Applet };
  otherApplets: string[];
  defaultApplet?: string;
  activeApplet?: string;
  previousApplet?: string;
  appletState?: any;
  votedApplets?: votedAppletState;
  // Loading
  showSpinner?: boolean;
  componentsLoading: Set<string>;
  // Header
  detailScreenHeader?: string;
  // IAP
  donationsAvailable?: boolean;
  iapOfferings?: Record<string, any>;
  // Toast
  setToast?: Record<string, any>;
}

type PersistAppStateOmittedKeys = "showSpinner";
// Solution for PersistAppState to filter keys
export const persistAppStateOmittedKeys = new Set<PersistAppStateOmittedKeys>([
  "showSpinner",
]);

export interface PersistAppState
  extends Omit<AppState, PersistAppStateOmittedKeys> {}

export interface AppletState {
  baseURL?: string;
  token?: string | null;
  authenticated?: boolean;
  isConfigured?: boolean;
  viewType?: ViewType;
}
