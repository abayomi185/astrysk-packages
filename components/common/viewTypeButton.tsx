import React from "react";
import { Button } from "tamagui";
import { LayoutGrid, List, AlertCircle } from "@tamagui/lucide-icons";
import { ViewType } from "@astrysk/types";
import { StoreApi, UseBoundStore } from "zustand";
import { AppletState } from "@astrysk/stores/types";

export const changeViewType = <T extends AppletState>(
  currentViewType: ViewType,
  supported_view_types: ViewType[],
  appletStore: UseBoundStore<StoreApi<T>>
) => {
  const currentViewTypeIndex = supported_view_types.indexOf(currentViewType);

  const nextViewTypeIndex =
    (currentViewTypeIndex + 1) % supported_view_types.length;
  const nextViewType = supported_view_types[nextViewTypeIndex];

  appletStore.setState((prevState) => ({
    ...prevState,
    viewType: nextViewType,
  }));
};

export const ViewTypeButton: React.FC<{
  viewType: ViewType;
  onPressHandler: () => void;
}> = ({ viewType, onPressHandler }) => {
  const icons: Partial<{ [key in ViewType]: React.ReactElement }> = {
    [ViewType.Grid]: <LayoutGrid size={18} opacity={0.8} />,
    [ViewType.List]: <List size={18} opacity={0.8} />,
  };

  return (
    <Button
      flex={1}
      height="$2.5"
      paddingHorizontal="$3"
      backgroundColor="$gray5"
      onPress={onPressHandler}
    >
      {icons[viewType] || <AlertCircle size={18} opacity={0.8} />}
    </Button>
  );
};
