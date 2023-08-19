import React from "react";
import { PixelRatio } from "react-native";
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
    <XStack flex={1} width="auto" marginLeft="$2" alignItems="center">
      <Button
        height="$2.5"
        borderRadius="$8"
        paddingHorizontal="$3"
        onPress={() => handlePress(id)}
        backgroundColor={active ? activeBackgroundColor : "$gray5"}
      >
        <XStack alignItems="center" justifyContent="space-between">
          <Text numberOfLines={1} opacity={0.8}>
            {t(id)}
          </Text>
          <ChevronDown size={18} opacity={0.8} />
        </XStack>
      </Button>
    </XStack>
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
          <X size={20 * PixelRatio.getFontScale()} opacity={0.8} color="red" />
        </XStack>
      </XStack>
    </Button>
  );
};
