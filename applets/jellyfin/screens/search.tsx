import React from "react";
import debounce from "lodash.debounce";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useJellyfinConfigurator } from "../utils";
import { useJellyfinSearchHeader } from "../components/useHeader";
import JellyfinSearchLanding from "../components/search/searchLanding";
import JellyfinSearchResults from "../components/search/searchResults";
import JellyfinSearchFilterBar from "../components/search/searchFilterBar";
import { useTranslation } from "react-i18next";
import { JellyfinSearchFilterContext } from "../types";
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

const JellyfinSearch: React.FC = () => {
  useJellyfinConfigurator();

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

  useJellyfinSearchHeader(t);

  return (
    <YStack height="100%" width="100%">
      <JellyfinSearchFilterBar context={JellyfinSearchFilterContext.Search} />
      {searchTerm ? (
        <JellyfinSearchResults searchTerm={searchTerm as string} />
      ) : (
        <JellyfinSearchLanding />
      )}
    </YStack>
  );
};

export default JellyfinSearch;
