import React from "react";
import debounce from "lodash.debounce";

export const debouncedSetter = (
  setStateFunction: (value: string | string[]) => void,
  delay: number = 500
) => {
  return React.useCallback(
    debounce((newSearchTerm: string | string[]) => {
      setStateFunction(newSearchTerm);
    }, delay),
    []
  );
};
