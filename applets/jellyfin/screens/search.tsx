import React from "react";
import debounce from "lodash.debounce";
import { useNavigation, useSearchParams } from "expo-router";
import { useJellyfinConfigurator } from "../utils";
import { useJellyfinSearchHeader } from "../components/useHeader";
import JellyfinSearchLanding from "../components/search/searchLanding";
import JellyfinSearchResults from "../components/search/searchResults";
import JellyfinSearchFilterBar from "../components/search/searchFilterBar";
import { useTranslation } from "react-i18next";
import { useJellyfinStore } from "../store";
import { JellyfinSearchFilterContext } from "../types";

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

const JellyfinSearch: React.FC = () => {
  useJellyfinConfigurator();

  const navigation = useNavigation();
  const { t } = useTranslation();

  const { searchPathName, searchQuery } = useSearchParams();

  const [searchTerm, setSearchTerm] = React.useState<string | string[]>();
  const isFilterApplied = useJellyfinStore((state) => state.searchFilters);

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

  useJellyfinSearchHeader(t, navigation);

  return (
    <>
      <JellyfinSearchFilterBar context={JellyfinSearchFilterContext.Search} />
      {searchTerm || isFilterApplied ? (
        <JellyfinSearchResults searchTerm={searchTerm as string} />
      ) : (
        <JellyfinSearchLanding />
      )}
    </>
  );
};

export default JellyfinSearch;
