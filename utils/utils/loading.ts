import React from "react";
import { UseQueryResult } from "@tanstack/react-query";
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
export const useSetLoadingSpinner = (
  functionName: string,
  queryStatus: UseQueryResult<any, unknown>["isSuccess"]
) => {
  React.useEffect(() => {
    if (queryStatus) {
      setLoadingSpinner(functionName, Actions.DONE);
    }
  }, [queryStatus]);
};
