import React from "react";
import { useNavigation } from "expo-router";
import { YStack, Text, Button } from "tamagui";
import { useTranslation } from "react-i18next";

export const PageNotFound = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Text>{t("common:pageNotFound")}</Text>
      <Button
        marginTop="$3"
        borderRadius="$8"
        onPress={() => navigation.goBack()}
        backgroundColor="$purple6"
      >
        {t("common:goBack")}
      </Button>
    </YStack>
  );
};
