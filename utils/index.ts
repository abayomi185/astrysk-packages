export * as appletUtils from "./utils/applet";

export type { ContextMenuOptions } from "./utils/context";

export { useDebounce } from "./utils/debounce";

export { useRefreshHandler } from "./utils/refresh";

export { onItemLayout, getFlashListColumnsFromViewType } from "./utils/layout";

export { useColorScheme, getIconColor } from "./utils/colorScheme";

export { filterPersistState } from "./utils/store";

export {
  setLoadingSpinner,
  useLoadingSpinner,
  useQueryLoadingSpinner,
} from "./utils/loading";

export { isEmpty, getStringValue, getNumberValue } from "./utils/object";

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

export { isTestflightBuild } from "./utils/testflight";

export { getMMKVStoreForId, getMMKVStorageAdapter } from "./utils/mmkv";

export { goToDetailScreen, goToModalScreen } from "./utils/router";

export {
  type FilterKind,
  type FilterKindValue,
  createSettingsOptionsObject,
} from "./utils/search";

export * as storageUtils from "./utils/storage";
