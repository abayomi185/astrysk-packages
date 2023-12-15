import { TFunction } from "i18next";
import { NavigationProp } from "@react-navigation/native";
import { FilterOrder, SettingsOptionProps } from "@astrysk/types";

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
