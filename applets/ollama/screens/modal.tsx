import React, { Suspense } from "react";
import { useGlobalSearchParams, useNavigation } from "expo-router";

import { useTranslation } from "react-i18next";

import {
  OllamaDetailScreenContext,
  OllamaDetailScreenProps,
  OllamaSearchFilterContext,
} from "../types";
import OllamaSearchFilterOptions from "../components/search/searchFilterOptions";
import { useOllamaModalHeader } from "../components/useHeader";
import OllamaSelectText from "../components/modal/selectText";
import { useOllamaStore } from "../store";
import OllamaChatHistory from "../components/modal/chatHistory";
import { Button, Text } from "tamagui";

const OllamaModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useGlobalSearchParams() as OllamaDetailScreenProps;

  // NOTE: SEARCH FILTER
  if (params.context === OllamaDetailScreenContext.SearchFilter) {
    const filterType = params?.itemId as string;

    const searchContext =
      params.searchContext ?? OllamaSearchFilterContext.Search;

    useOllamaModalHeader(navigation, t(filterType));

    return (
      <OllamaSearchFilterOptions
        context={searchContext}
        filterType={filterType}
      />
    );
  }

  if (params.context === OllamaDetailScreenContext.SelectText) {
    const textCache = useOllamaStore.getState().ollamaSelectTextCache ?? "";

    const text =
      textCache.length > 2 ? textCache[textCache.length - 1] : textCache[0];

    return <OllamaSelectText text={text} edit={false} />;
  }

  if (params.context === OllamaDetailScreenContext.EditText) {
    const text = useOllamaStore.getState().ollamaEditTextCache ?? "";

    return <OllamaSelectText text={text} edit={true} />;
  }

  if (params.context === OllamaDetailScreenContext.History) {
    useOllamaModalHeader(navigation, `${t("ollama:chatHistory")}`);

    return <OllamaChatHistory />;
  }

  return null;
};

export default OllamaModal;
