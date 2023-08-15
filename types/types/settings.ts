import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FilterOrder } from "./order";
import { ColorTokens } from "tamagui";

export interface SettingsOptionProps {
  key: string; // Locales string
  name?: string;
  icon?: IconDefinition;
  iconSize?: number;
  selectionHint?: string;
  selectedValue?: string | null;
  supportsOrderBy?: boolean;
  selectedValueOrder?: FilterOrder;
  value?: string | string[];
  route?: string;
  type: "label" | "toggle" | "item" | "action";
  accentColor?: ColorTokens | string;
  viewType?: "modal" | "detail";
  onPress?: () => void;
  firstItem?: boolean;
  lastItem?: boolean;
}

export interface SettingsSection {
  options: SettingsOptionProps[];
}
