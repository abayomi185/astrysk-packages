import * as Crypto from "expo-crypto";
import { Screens } from "@astrysk/constants";
import { Router, TabContext } from "@astrysk/types";

export const goToDetailScreen = <
  TScreenContext,
  TSearchContext,
  TDetailScreenProps
>({
  router,
  itemId,
  tabContext,
  screenContext,
  searchContext,
  otherParams,
}: {
  router: Router;
  itemId: string;
  tabContext: TabContext;
  screenContext?: TScreenContext;
  searchContext?: TSearchContext;
  otherParams?: Record<string, any>;
}) => {
  const screenRoute =
    tabContext === TabContext.Search
      ? Screens.SEARCH_SCREEN_DETAIL_ROUTE
      : Screens.HOME_SCREEN_DETAIL_ROUTE;
  router.push({
    pathname: `/${screenRoute}+${Crypto.randomUUID()}`,
    params: {
      context: screenContext,
      itemId,
      tabContext: tabContext,
      ...otherParams,
    } as TDetailScreenProps,
  });
};

export const goToFullScreenDetailScreen = <
  TScreenContext,
  TSearchContext,
  TDetailScreenProps
>({
  router,
  itemId,
  tabContext,
  screenContext,
  searchContext,
  otherParams,
}: {
  router: Router;
  itemId: string;
  tabContext: TabContext;
  screenContext?: TScreenContext;
  searchContext?: TSearchContext;
  otherParams?: Record<string, any>;
}) => {
  // const screenRoute = Screens.DETAIL_ROUTE;
  const screenRoute = Screens.ROOT_DETAIL_ROUTE;
  router.push({
    pathname: `/${screenRoute}+${Crypto.randomUUID()}`,
    params: {
      context: screenContext,
      itemId,
      tabContext: tabContext,
      ...otherParams,
    } as TDetailScreenProps,
  });
};

export const goToModalScreen = <
  TScreenContext,
  TSearchContext,
  TDetailScreenProps
>({
  router,
  itemId,
  screenContext,
  searchContext,
  otherParams,
}: {
  router: Router;
  itemId: number | string;
  screenContext?: TScreenContext;
  searchContext?: TSearchContext;
  otherParams?: Record<string, any>;
}) => {
  router.push({
    pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
    params: {
      context: screenContext,
      itemId: itemId,
      ...otherParams,
    } as TDetailScreenProps,
  });
};
