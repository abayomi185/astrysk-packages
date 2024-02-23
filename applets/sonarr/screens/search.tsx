import React from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useSonarrConfigurator } from "../utils";
import { useSonarrSearchHeader } from "../components/useHeader";
import SonarrSearchLanding from "../components/search/searchLanding";
import SonarrSearchFilterBar from "../components/search/searchFilterBar";
import { useTranslation } from "react-i18next";
import { SonarrSearchFilterContext } from "../types";
import { YStack } from "tamagui";
import { debouncedSetter } from "@astrysk/components";

const SonarrSearch: React.FC = () => {
  useSonarrConfigurator();

  const navigation = useNavigation();
  const { t } = useTranslation();

  const { searchPathName, searchQuery } = useLocalSearchParams();

  const [searchTerm, setSearchTerm] = React.useState<string | string[]>();

  // Successfully debounce the search term
  const debouncedSetSearchTerm = debouncedSetter(setSearchTerm);

  React.useEffect(() => {
    if (searchPathName === "search") {
      debouncedSetSearchTerm(searchQuery as string);
    }
  }, [searchQuery]);

  useSonarrSearchHeader(t);

  return (
    <YStack height="100%" width="100%">
      <SonarrSearchFilterBar context={SonarrSearchFilterContext.Search} />
      <SonarrSearchLanding searchTerm={searchTerm as string} />
    </YStack>
  );
};

export default SonarrSearch;
