import React from "react";
import { useRouter } from "expo-router";
import { XStack, Button, GetProps, Stack } from "tamagui";
import { X } from "@tamagui/lucide-icons";
import { FlashList } from "@shopify/flash-list";
import { Screens } from "@astrysk/constants";
import { useProxmoxStore } from "../../store";
import {
  FilterButton,
  ViewTypeButton,
  changeViewType,
} from "@astrysk/components";
import {
  ProxmoxDetailScreenContext,
  ProxmoxDetailScreenProps,
  ProxmoxFilter,
  ProxmoxSearchFilterContext,
} from "../../types";
import { proxmoxColors } from "../../colors";
import { isEmpty } from "@astrysk/utils";
import { ViewType } from "@astrysk/types";
import { PROXMOX_SUPPORTED_VIEW_TYPES } from "../../utils";

const getProxmoxFilterBarOptions = (
  context: ProxmoxSearchFilterContext
): ProxmoxFilter[] => {
  return [
    {
      id: "proxmox:type",
      options: [
        { value: "proxmox:qemu" },
        { value: "proxmox:lxc" },
        { value: "proxmox:node" },
        { value: "proxmox:storage" },
        { value: "proxmox:sdn" },
      ],
    },
    {
      id: "proxmox:order",
      options: [
        { value: "proxmox:id", supportsOrderBy: true },
        { value: "proxmox:alphabetical", supportsOrderBy: true },
      ],
    },
  ];
};

const ProxmoxSearchFilterBar: React.FC<{
  context: ProxmoxSearchFilterContext;
  handleClearAllFilters?: () => void;
  style?: GetProps<typeof Stack>;
}> = ({ context, handleClearAllFilters, style }) => {
  const router = useRouter();

  const viewType = useProxmoxStore((state) => state.viewType) ?? ViewType.List;

  const searchFilters = useProxmoxStore((state) => state.searchFilters);

  const handleFilterPress = (id: string, isToggle?: boolean) => {
    if (isToggle) {
      // WARN: Put toggle logic here
    } else {
      router.push({
        pathname: `/${Screens.ROOT_MODAL_ROUTE}`,
        params: {
          context: ProxmoxDetailScreenContext.SearchFilter,
          searchContext: context,
          itemId: id,
        } as ProxmoxDetailScreenProps,
      });
    }
  };

  const clearFiltersForContext = () => {
    // Don't clear filters if there are none
    if (!searchFilters?.[context]) return;
    // Clear filters for context
    useProxmoxStore.setState((state) => ({
      searchFilters: {
        ...state.searchFilters,
        [context]: undefined,
      },
    }));
    handleClearAllFilters?.();
  };

  const checkActiveStatus = (id: string) => {
    if (searchFilters?.[context] && id in (searchFilters?.[context] ?? {})) {
      return true;
    }
    return false;
  };

  const filterBarOptions = React.useMemo(() => {
    const filterBarOptions = getProxmoxFilterBarOptions(context);
    useProxmoxStore.setState((state) => ({
      filterBarOptions: {
        ...state.filterBarOptions,
        [context]: filterBarOptions,
      },
    }));
    return filterBarOptions;
  }, [context]);

  return (
    <XStack height="$4" backgroundColor="$backgroundTransparent" {...style}>
      <XStack flex={1}>
        <FlashList
          horizontal
          data={filterBarOptions}
          extraData={searchFilters?.[context]}
          renderItem={({ item }) => (
            <FilterButton
              id={item.id}
              handlePress={handleFilterPress}
              active={checkActiveStatus(item.id)}
              activeBackgroundColor={proxmoxColors.primary}
            />
          )}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <XStack flex={1} width="$3" marginLeft="$3" alignItems="center">
              <Button
                flex={1}
                height="$2.5"
                borderRadius="$8"
                paddingHorizontal="$3"
                backgroundColor={
                  isEmpty(searchFilters?.[context])
                    ? "$gray5"
                    : proxmoxColors.primary
                }
                onPress={() => clearFiltersForContext()}
              >
                <X size={18} opacity={0.8} />
              </Button>
            </XStack>
          }
          ListFooterComponent={() => <XStack marginLeft="$3" />}
          estimatedItemSize={69}
        />
      </XStack>
      {/* <XStack width="$3" marginLeft="$2.5" marginRight="$3" alignItems="center"> */}
      {/*   <ViewTypeButton */}
      {/*     viewType={viewType} */}
      {/*     onPressHandler={() => { */}
      {/*       changeViewType( */}
      {/*         viewType, */}
      {/*         PROXMOX_SUPPORTED_VIEW_TYPES, */}
      {/*         useProxmoxStore */}
      {/*       ); */}
      {/*     }} */}
      {/*   /> */}
      {/* </XStack> */}
    </XStack>
  );
};
export default ProxmoxSearchFilterBar;
