import React from "react";
import { YStack } from "tamagui";

import { useProxmoxConfigurator } from "../utils";

import { useProxmoxHomeHeader } from "../components/useHeader";
import { useNavigation } from "expo-router";

const ProxmoxHome: React.FC = () => {
  useProxmoxConfigurator();

  const navigation = useNavigation();

  useProxmoxHomeHeader(navigation);

  return <YStack height="100%"></YStack>;
};

export default ProxmoxHome;
