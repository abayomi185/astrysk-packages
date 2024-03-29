import config from "@astrysk/styles";

// HOME
export { default as LandingPage } from "./home/landingPage";

// SEARCH
export {
  FilterButton,
  ClearFilterButton,
  CancelFilterButton,
} from "./search/filterButtons";

// COMMON
export { AppletButton, AppletButtonBanner } from "./common/appletButton";

export { debouncedSetter } from "./common/debouncer";

export { HeaderRightWrapper } from "./common/headerRightWrapper";
export {
  useHomeHeader,
  useSearchHeader,
  useSettingsHeader,
  useDetailHeader,
  useFullScreenDetailHeader,
  useModalHeader,
} from "./common/header";
export { AppletHeaderButton } from "./common/appletHeaderButton";
export {
  LoadingIndicator,
  registerLoadingComponent,
  unregisterLoadingComponent,
  resetLoadingComponent,
  useResetLoadingComponent,
} from "./common/loadingIndicator";

export { AppletVoteCard } from "./common/appletVoteCard";

// Moved to utils package
// export {
//   DefaultAppletLogo,
//   DefaultAppletIcon,
// } from "./common/defaultAppletLogo";

export { SettingsOption, SettingsOptionHeader } from "./common/settingsOption";

export { PageNotFound } from "./common/pageNotFound";

export { BottomSheetBackground } from "./common/bottomSheetBackground";

export { SectionTitle } from "./common/sectionTitle";

export { EmptyList } from "./common/emptyList";

export { ViewTypeButton, changeViewType } from "./common/viewTypeButton";

export {
  showToast,
  type ShowToastOptions,
  SafeToastViewport,
  UniversalToast,
  useMutationOnSuccessToast,
  useMutationOnErrorToast,
} from "./common/toast";
