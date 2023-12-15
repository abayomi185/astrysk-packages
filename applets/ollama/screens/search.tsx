import React from "react";
import { useNavigation, useGlobalSearchParams } from "expo-router";
import { useOllamaConfigurator } from "../utils";
import { useOllamaSearchHeader } from "../components/useHeader";
import OllamaSearchLanding from "../components/search/searchLanding";
import OllamaSearchFilterBar from "../components/search/searchFilterBar";
import { useTranslation } from "react-i18next";
import { OllamaSearchFilterContext } from "../types";
import { YStack } from "tamagui";
import { debouncedSetter } from "@astrysk/components";

const OllamaSearch: React.FC = () => {
  useOllamaConfigurator();

  const navigation = useNavigation();
  const { t } = useTranslation();

  const { searchPathName, searchQuery } = useGlobalSearchParams();

  const [searchTerm, setSearchTerm] = React.useState<string | string[]>();

  // Successfully debounce the search term
  const debouncedSetSearchTerm = debouncedSetter(setSearchTerm);

  React.useEffect(() => {
    if (searchPathName === "search") {
      debouncedSetSearchTerm(searchQuery as string);
    }
  }, [searchQuery]);

  useOllamaSearchHeader(t, navigation);

  return (
    <YStack height="100%" width="100%">
      <OllamaSearchFilterBar context={OllamaSearchFilterContext.Search} />
      <OllamaSearchLanding searchTerm={searchTerm as string} />
    </YStack>
  );
};

export default OllamaSearch;
