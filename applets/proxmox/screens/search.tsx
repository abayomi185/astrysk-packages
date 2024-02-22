import React from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { useProxmoxConfigurator } from "../utils";
import { useProxmoxSearchHeader } from "../components/useHeader";
import ProxmoxSearchLanding from "../components/search/searchLanding";
import ProxmoxSearchFilterBar from "../components/search/searchFilterBar";
import { useTranslation } from "react-i18next";
import { ProxmoxSearchFilterContext } from "../types";
import { YStack } from "tamagui";
import { debouncedSetter } from "@astrysk/components";

const ProxmoxSearch: React.FC = () => {
  useProxmoxConfigurator();

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

  useProxmoxSearchHeader(t, navigation);

  return (
    <YStack height="100%" width="100%">
      <ProxmoxSearchFilterBar context={ProxmoxSearchFilterContext.Search} />
      <ProxmoxSearchLanding searchTerm={searchTerm as string} />
    </YStack>
  );
};

export default ProxmoxSearch;
