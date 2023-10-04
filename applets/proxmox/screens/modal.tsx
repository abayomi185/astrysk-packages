import React, { Suspense } from "react";
import { useSearchParams, useNavigation } from "expo-router";

import { useTranslation } from "react-i18next";

import { useProxmoxStore } from "../store";
import { ProxmoxDetailScreenProps } from "../types";

const ProxmoxModal = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const params = useSearchParams() as ProxmoxDetailScreenProps;

  return null;
};

export default ProxmoxModal;
