import { IconDefinition } from "@fortawesome/fontawesome-common-types";

export interface SettingsOptionProps {
  key: string; // Locales string
  name?: string;
  icon?: IconDefinition;
  iconSize?: number;
  selectionHint?: string;
  selectedValue?: string | null;
  value?: string | string[];
  route?: string;
  type: "label" | "toggle" | "item" | "action";
  viewType?: "modal" | "detail";
  onPress?: () => void;
  firstItem?: boolean;
  lastItem?: boolean;
}

export interface SettingsSection {
  options: SettingsOptionProps[];
}
