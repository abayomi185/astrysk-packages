import React from "react";
import debounce from "lodash.debounce";
import { useNavigation, useSearchParams } from "expo-router";
import { useJellyfinConfigurator } from "../utils";
import { useJellyfinSearchHeader } from "../components/useHeader";
import JellyfinSearchLanding from "../components/search/searchLanding";
import JellyfinSearchResults from "../components/search/searchResults";
import JellyfinSearchFilterBar from "../components/search/searchFilterBar";
import { useTranslation } from "react-i18next";

const JellyfinSearch: React.FC = () => {
  useJellyfinConfigurator();

  const navigation = useNavigation();
  const { t } = useTranslation();

  const { searchPathName, searchQuery } = useSearchParams();

  const [searchTerm, setSearchTerm] = React.useState<string>();

  // Successfully debounce the search term
  const debouncedSetSearchTerm = React.useCallback(
    debounce((newSearchTerm: string) => {
      setSearchTerm(newSearchTerm);
    }, 500),
    []
  );

  React.useMemo(() => {
    // Set searchTerm immediately if empty string
    if (searchPathName === "search" && searchQuery == "") {
      setSearchTerm(searchQuery);
    }
    // Otherwise debounce
    else if (searchPathName === "search" && searchQuery !== searchTerm) {
      debouncedSetSearchTerm(searchQuery as string);
    }
  }, [searchQuery]);

  useJellyfinSearchHeader(t, navigation);

  // WARN: Use search params to send things to the filter bar

  return (
    <>
      <JellyfinSearchFilterBar />
      {searchTerm ? (
        <JellyfinSearchResults searchTerm={searchTerm as string} />
      ) : (
        <JellyfinSearchLanding />
      )}
    </>
  );
};

export default JellyfinSearch;
