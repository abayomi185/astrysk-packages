import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Button, XStack, Text, ColorTokens } from "tamagui";
import { ChevronDown } from "@tamagui/lucide-icons";

export const FilterButton: React.FC<{
  id: string;
  data: string[];
  handlePress: (id: string) => void;
  active: boolean;
  activeBackgroundColor: ColorTokens;
}> = ({ id, data, handlePress, active, activeBackgroundColor }) => {
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
