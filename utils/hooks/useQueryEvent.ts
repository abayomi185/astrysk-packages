import type { UseQueryResult } from "@tanstack/react-query";
import React from "react";

type QueryEvents<RespT, ErrT> = {
  onSuccess: (resp: RespT) => unknown;
  onError: (resp: ErrT) => unknown;
  onSettled: (data: RespT | undefined, error: ErrT | null) => unknown;
};

export const useQueryEvents = <RespT, ErrT>(
  query: UseQueryResult<RespT, ErrT>,
  callbacks: Partial<QueryEvents<RespT, ErrT>>
) => {
  const { onSuccess, onError, onSettled } = callbacks;

  const onSuccessRef = React.useRef(onSuccess);
  const onErrorRef = React.useRef(onError);
  const onSettledRef = React.useRef(onSettled);

  React.useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onSettledRef.current = onSettled;
  }, [onSuccess, onError, onSettled]);

  React.useEffect(() => {
    if (query.data && onSuccessRef.current) {
      onSuccessRef.current(query.data);
    }
  }, [query.data]);

  React.useEffect(() => {
    if (query.error && onErrorRef.current) {
      onErrorRef.current(query.error);
    }
  }, [query.error]);

  React.useEffect(() => {
    if (
      (query.data !== undefined || query.error !== undefined) &&
      onSettledRef.current
    ) {
      onSettledRef.current(query.data, query.error || null);
    }
  }, [query.data, query.error]);

  return query;
};
