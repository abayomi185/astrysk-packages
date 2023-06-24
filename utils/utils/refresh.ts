import React from "react";

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
