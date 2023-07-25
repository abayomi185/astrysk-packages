import React from "react";
import debounce from "lodash.debounce";
import { useNavigation, useSearchParams } from "expo-router";
import { useSonarrConfigurator } from "../utils";
import { useSonarrSearchHeader } from "../components/useHeader";
import SonarrSearchLanding from "../components/search/searchLanding";
import SonarrSearchResults from "../components/search/searchResults";
import SonarrSearchFilterBar from "../components/search/searchFilterBar";
import { useTranslation } from "react-i18next";
import { SonarrSearchFilterContext } from "../types";
import { YStack } from "tamagui";

const debouncedSetter = (
  setStateFunction: (value: string | string[]) => void,
  delay: number = 500
) => {
  return React.useCallback(
    debounce((newSearchTerm: string | string[]) => {
      setStateFunction(newSearchTerm);
    }, delay),
    []
  );
};

const SonarrSearch: React.FC = () => {
  useSonarrConfigurator();

  const navigation = useNavigation();
  const { t } = useTranslation();

  const { searchPathName, searchQuery } = useSearchParams();

  const [searchTerm, setSearchTerm] = React.useState<string | string[]>();

  // Successfully debounce the search term
  const debouncedSetSearchTerm = debouncedSetter(setSearchTerm);

  React.useMemo(() => {
    if (searchPathName === "search") {
      // Set searchTerm immediately if empty string
      if (searchQuery == "") {
        setSearchTerm(searchQuery);
      }
      // Otherwise debounce
      else if (searchQuery !== searchTerm) {
        debouncedSetSearchTerm(searchQuery as string);
      }
    }
  }, [searchQuery]);

  useSonarrSearchHeader(t, navigation);

  return (
    <YStack height="100%" width="100%">
      <SonarrSearchFilterBar context={SonarrSearchFilterContext.Search} />
      {searchTerm ? (
        <SonarrSearchResults searchTerm={searchTerm as string} />
      ) : (
        <SonarrSearchLanding />
      )}
    </YStack>
  );
};

export default SonarrSearch;
