export * as appletUtils from "./utils/applet";

export type { ContextMenuOptions } from "./utils/context";

export { useDebounce } from "./utils/debounce";

export { useRefreshHandler } from "./utils/refresh";

export { onItemLayout } from "./utils/layout";

export { useColorScheme, getIconColor } from "./utils/colorScheme";

export { filterPersistState } from "./utils/store";

export {
  setLoadingSpinner,
  useLoadingSpinner,
  useSetLoadingSpinner,
} from "./utils/loading";

export {
  useHomeHeader,
  useSearchHeader,
  useSettingsHeader,
} from "./utils/header";

export { isEmpty } from "./utils/object";

export { useGetListColumnNumber } from "./utils/list";

// export { TOAST_TOP_OFFSET, getToastTopOffset } from "./utils/toast";

export {
  UrlRegexPattern,
  updateURLWithSchema,
  promptUserForURLSchemaIfNotExists,
} from "./utils/validation";

export { expandableItemAnimationHandler } from "./utils/expandableItem";

export {
  MILLISECONDS_TO_MINUTES_MULTIPLIER,
  getDateFromHours,
  getStartAndEndOfWeek,
} from "./utils/datetime";
