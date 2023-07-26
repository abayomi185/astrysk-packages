import React from "react";

import { create_axios_instance } from "@astrysk/api";
import * as DeviceInfo from "expo-device";
import Constants from "expo-constants";
import * as Crypto from "expo-crypto";
import { useSonarrStore } from "./store";

import {
  registerLoadingComponent,
  unregisterLoadingComponent,
} from "@astrysk/components";
import { Actions, Screens } from "@astrysk/constants";
import { Router } from "@astrysk/types";

// NOTE: LOGIN / AUTHENTICATION / CONFIGURE
export const configureAxiosForSonarr = (
  baseURL: string,
  token?: string | null,
  customHeaders?: object,
  callback?: () => void
) => {
  const axiosConfig = {
    baseURL: baseURL,
    // headers: {
    //   // "Content-Type": "application/json",
    //   ...(token ? { apiKey: token } : {}),
    //   ...(customHeaders ? customHeaders : {}),
    // },
    params: {
      apikey: token,
    },
  };
  create_axios_instance(axiosConfig);
  callback && callback();
};

// Jellyfin configure function that all screens can run
// to authenticate and set up the applet appropriately
export const configureSonarr = () => {
  const isConfigured = useSonarrStore.getState().isConfigured;

  // Check if token and baseURL exists
  const baseURL = useSonarrStore.getState().baseURL;
  const token = useSonarrStore.getState().token;
  const customHeaders = useSonarrStore.getState().customHeaders;

  if (!baseURL) {
    return false;
  }

  if (isConfigured) {
    return true;
  }

  configureAxiosForSonarr(baseURL, token, customHeaders);

  useSonarrStore.setState({ isConfigured: true });

  return true;
};

export const useSonarrConfigurator = () => {
  return React.useEffect(() => {
    configureSonarr();
  }, []);
};