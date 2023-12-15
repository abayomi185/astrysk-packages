import React from "react";
import { YStack, Text, XStack, H3 } from "tamagui";

import { useOllamaConfigurator } from "../utils";

import { useOllamaHomeHeader } from "../components/useHeader";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";

const OllamaHome: React.FC = () => {
  const { t } = useTranslation();
  useOllamaConfigurator();

  const navigation = useNavigation();

  useOllamaHomeHeader(navigation);

  return (
    <YStack height="100%">
      <XStack flex={1} justifyContent="center" alignItems="center">
        <XStack padding="$8">
          <H3 textAlign="center" color="$gray9">
            {t("ollama:selectModelFromSearchTab")}
          </H3>
        </XStack>
      </XStack>
    </YStack>
  );
};

export default OllamaHome;
