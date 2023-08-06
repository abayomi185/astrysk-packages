import { Actions } from "@astrysk/constants";
import React from "react";
import { setLoadingSpinner } from "./loading";

export function useRefreshHandler(queryRefetch: () => Promise<unknown>) {
  const [isRefetching, setIsRefetching] = React.useState(false);

  async function refetch() {
    setIsRefetching(true);

    try {
      await queryRefetch();
    } finally {
      setIsRefetching(false);
    }
  }

  return {
    isRefetching,
    refetch,
  };
}
