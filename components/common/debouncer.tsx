import React from "react";
import debounce from "lodash.debounce";

export const debouncedSetter = (
  setStateFunction: (value: string | string[]) => void,
  delay: number = 300
) => {
  const debouncedFn = debounce((newSearchTerm: string | string[]) => {
    setStateFunction(newSearchTerm);
  }, delay);
  const callback = React.useCallback(debouncedFn, []);

  // Attach the cancel method
  callback.cancel = debouncedFn.cancel;

  return callback;
};
