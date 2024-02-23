import React from "react";
import { useGlobalSearchParams } from "expo-router";

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
import OllamaModelView from "../components/modal/model";
import OllamaAdvancedOptionsView from "../components/modal/advancedOptions";

const OllamaModal = () => {
  const { t } = useTranslation();

  const params = useGlobalSearchParams() as OllamaDetailScreenProps;

  // NOTE: SEARCH FILTER
  if (params.context === OllamaDetailScreenContext.SearchFilter) {
    const filterType = params?.itemId as string;

    const searchContext =
      params.searchContext ?? OllamaSearchFilterContext.Search;

    useOllamaModalHeader(t(filterType));

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
    const filterType = params?.itemId as string;

    useOllamaModalHeader(`${t("ollama:chatHistory")}`);

    return <OllamaChatHistory filterType={filterType} />;
  }

  if (params.context === OllamaDetailScreenContext.AdvancedOptions) {
    const filterType = params?.itemId as string;

    return <OllamaAdvancedOptionsView filterType={filterType} />;
  }

  if (params.context === OllamaDetailScreenContext.ModelPreview) {
    const filterType = params?.itemId as string;

    useOllamaModalHeader(`${t("ollama:model")}`);

    return <OllamaModelView filterType={filterType} />;
  }

  return null;
};

export default OllamaModal;
