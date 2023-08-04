import React from "react";
import {
  registerLoadingComponent,
  unregisterLoadingComponent,
} from "@astrysk/components/common/loadingIndicator";
import { Actions } from "@astrysk/constants";

// NOTE: LOADING SPINNER
type LoadingStatus = "done" | "loading";
export const setLoadingSpinner = (
  componentId: string,
  isLoaded: LoadingStatus
) => {
  isLoaded === Actions.DONE
    ? unregisterLoadingComponent(componentId)
    : registerLoadingComponent(componentId);
};
export const useLoadingSpinner = (functionName: string) =>
  React.useEffect(() => {
    setLoadingSpinner(functionName, Actions.LOADING);
  }, []);
