import config from "@astrysk/styles";

// HOME
export { default as LandingPage } from "./home/landingPage";

// COMMON
export { AppletButton, AppletButtonBanner } from "./common/appletButton";

export { HeaderRightWrapper } from "./common/headerRightWrapper";
export { AppletHeaderButton } from "./common/appletHeaderButton";
export {
  LoadingIndicator,
  registerLoadingComponent,
  unregisterLoadingComponent,
  resetLoadingComponent,
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
