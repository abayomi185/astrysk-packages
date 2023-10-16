import React from "react";
import { UseQueryResult, QueryKey } from "@tanstack/react-query";
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
  query: UseQueryResult<any, any> & {
    queryKey: QueryKey;
  }
) => {
  const queryKeyString = `${query.queryKey[0]}`;
  React.useEffect(() => {
    if (query.isFetching) {
      setLoadingSpinner(queryKeyString, Actions.LOADING);
    } else {
      setLoadingSpinner(queryKeyString, Actions.DONE);
    }
  }, [query.isFetching]);
};
