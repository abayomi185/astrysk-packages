import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Button, XStack, Text, ColorTokens } from "tamagui";
import { X, ChevronDown } from "@tamagui/lucide-icons";
import { TFunction } from "i18next";

export const FilterButton: React.FC<{
  id: string;
  handlePress: (id: string) => void;
  active: boolean;
  activeBackgroundColor: ColorTokens | string;
}> = ({ id, handlePress, active, activeBackgroundColor }) => {
  const { t } = useTranslation();

  return (
    <Suspense>
      <XStack flex={1} width="$8" marginLeft="$2" alignItems="center">
        <Button
          flex={1}
          height="$2.5"
          borderRadius="$8"
          paddingHorizontal="$3"
          onPress={() => handlePress(id)}
          backgroundColor={active ? activeBackgroundColor : "$gray5"}
        >
          <XStack flex={1} alignItems="center" justifyContent="space-between">
            <Text numberOfLines={1} ellipsizeMode="tail" opacity={0.8}>
              {t(id)}
            </Text>
            <ChevronDown size={18} opacity={0.8} />
          </XStack>
        </Button>
      </XStack>
    </Suspense>
  );
};

export const ClearFilterButton: React.FC<{
  t: TFunction;
  clearFilter: () => void;
}> = ({ t, clearFilter }) => {
  return (
    <Button
      flex={1}
      marginBottom="$3"
      backgroundColor="$gray1"
      onPress={clearFilter}
    >
      <XStack alignItems="center">
        <Text>{t("common:clearFilter")}</Text>
        <XStack marginLeft="$1">
          <X size={18} opacity={0.8} color="red" />
        </XStack>
      </XStack>
    </Button>
  );
};
