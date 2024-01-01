import React from "react";
import debounce from "lodash.debounce";

export const debouncedSetter = (
  setStateFunction: (value: any) => void,
  delay: number = 300
) => {
  const debouncedFn = debounce((newValue: any) => {
    setStateFunction(newValue);
  }, delay);
  const callback = React.useCallback(debouncedFn, []);

  // Attach the cancel method
  callback.cancel = debouncedFn.cancel;

  return callback;
};
