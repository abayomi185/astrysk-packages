import React from "react";
import { YStack } from "tamagui";

import { useProxmoxConfigurator } from "../utils";

import { useProxmoxHomeHeader } from "../components/useHeader";
import ProxmoxSummary from "../components/home/summary";

const ProxmoxHome: React.FC = () => {
  useProxmoxConfigurator();

  useProxmoxHomeHeader();

  return (
    <YStack height="100%">
      <ProxmoxSummary />
    </YStack>
  );
};

export default ProxmoxHome;
