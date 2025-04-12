import React from "react";
import {
  UseQueryResult,
  QueryKey,
  UseMutationResult,
} from "@tanstack/react-query";
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

export const useQueryLoadingSpinner = (
  query: UseQueryResult<any, any> & {
    queryKey: QueryKey;
  }
) => {
  const queryKeyString = `${query.queryKey[0]}`;
  React.useEffect(() => {
    const action = query.isFetching ? Actions.LOADING : Actions.DONE;
    setLoadingSpinner(queryKeyString, action);
  }, [query.isFetching, queryKeyString]);
};

export const useMutationLoadingSpinner = (
  mutation: UseMutationResult<any, any, any>,
  mutationKey: string
) => {
  const mutationKeyString = mutationKey;
  React.useEffect(() => {
    const action = mutation.isPending ? Actions.LOADING : Actions.DONE;
    setLoadingSpinner(mutationKeyString, action);
  }, [mutation.isPending, mutationKeyString]);
};
