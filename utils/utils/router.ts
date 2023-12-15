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
}: {
  router: Router;
  itemId: string;
  tabContext: TabContext;
  screenContext?: TScreenContext;
  searchContext?: TSearchContext;
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
}: {
  router: Router;
  itemId: string;
  tabContext: TabContext;
  screenContext?: TScreenContext;
  searchContext?: TSearchContext;
}) => {
  // const screenRoute = Screens.DETAIL_ROUTE;
  const screenRoute = Screens.ROOT_DETAIL_ROUTE;
  router.push({
    pathname: `/${screenRoute}+${Crypto.randomUUID()}`,
    params: {
      context: screenContext,
      itemId,
      tabContext: tabContext,
    } as TDetailScreenProps,
  });
};

export const goToModalScreen = <
  TScreenContext,
  TSearchContext,
  TDetailScreenProps
>({
  router,
  node,
  resource,
  screenContext,
  searchContext,
}: {
  router: Router;
  node: string;
  resource: number | string;
  screenContext?: TScreenContext;
  searchContext?: TSearchContext;
}) => {
  router.push({
    pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
    params: {
      context: screenContext,
      node: node,
      itemId: resource,
    } as TDetailScreenProps,
  });
};
