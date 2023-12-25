import { TFunction } from "i18next";
import { NavigationProp } from "@react-navigation/native";
import { FilterOrder, Router, SettingsOptionProps } from "@astrysk/types";
import { Screens } from "@astrysk/constants";

export type FilterKind = string;
export interface FilterKindValue {
  value?: string;
  order?: FilterOrder;
}

export const createSettingsOptionsObject = <
  TSearchFilterContext,
  TFilterKind extends FilterKind,
  TFilterKindValue extends FilterKindValue
>(
  t: TFunction,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  item: string,
  supportsOrderBy: boolean,
  context: TSearchFilterContext,
  filterType: TFilterKind,
  selectedValue: TFilterKindValue,
  first?: boolean,
  last?: boolean,
  onPressFn?: () => void
) => {
  return {
    key: item,
    name: t(item),
    type: "item",
    selectedValue: selectedValue.value,
    supportsOrderBy,
    selectedValueOrder: selectedValue.order,
    onPress: onPressFn,
    firstItem: first,
    lastItem: last,
  } as SettingsOptionProps;
};

export const handleFilterPress = <T, K, P>(
  router: Router,
  context: K,
  searchContext: P,
  id: string,
  isToggle?: boolean
) => {
  if (isToggle) {
    // WARN: Put toggle logic here
  } else {
    router.push({
      pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
      params: {
        context,
        searchContext,
        itemId: id,
      } as T,
    });
  }
};

export const checkActiveStatus = <T>(
  searchFilters: Partial<Record<any, any>> | undefined,
  context: T,
  id: string
) => {
  if (searchFilters?.[context] && id in (searchFilters?.[context] ?? {})) {
    return true;
  }
  return false;
};
