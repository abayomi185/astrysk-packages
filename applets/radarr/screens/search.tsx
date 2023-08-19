import React from "react";
import { useNavigation, useSearchParams } from "expo-router";
import { useRadarrConfigurator } from "../utils";
import { useRadarrSearchHeader } from "../components/useHeader";
import RadarrSearchLanding from "../components/search/searchLanding";
import RadarrSearchFilterBar from "../components/search/searchFilterBar";
import { useTranslation } from "react-i18next";
import { RadarrSearchFilterContext } from "../types";
import { YStack } from "tamagui";
import { debouncedSetter } from "@astrysk/components";

const RadarrSearch: React.FC = () => {
  useRadarrConfigurator();

  const navigation = useNavigation();
  const { t } = useTranslation();

  const { searchPathName, searchQuery } = useSearchParams();

  const [searchTerm, setSearchTerm] = React.useState<string | string[]>();

  // Successfully debounce the search term
  const debouncedSetSearchTerm = debouncedSetter(setSearchTerm);

  React.useEffect(() => {
    if (searchPathName === "search") {
      debouncedSetSearchTerm(searchQuery as string);
    }
  }, [searchQuery]);

  useRadarrSearchHeader(t, navigation);

  return (
    <YStack height="100%" width="100%">
      <RadarrSearchFilterBar context={RadarrSearchFilterContext.Search} />
      <RadarrSearchLanding searchTerm={searchTerm as string} />
    </YStack>
  );
};

export default RadarrSearch;
