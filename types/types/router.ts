import { NavigationProp, NavigationState } from "@react-navigation/native";

// export type Href = string | HrefObject;

// export interface HrefObject {
//   /** Path representing the selected route `/[id]`. */
//   pathname?: string;
//   /** Query parameters for the path. */
//   params?: Record<string, any>;
// }

// Router type Alias from Expo Router
export type Router = {
  /** Navigate to the provided href. */
  push: (href: any) => void;
  /** Navigate to route without appending to the history. */
  replace: (href: any) => void;
  /** Go back in the history. */
  back: () => void;
  /** Update the current route query params. */
  setParams: (params?: Record<string, string>) => void;
};

export type ExtendedNavigationProp = Omit<
  NavigationProp<ReactNavigation.RootParamList>,
  "getState"
> & {
  getState(): NavigationState | undefined;
};
