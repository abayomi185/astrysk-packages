// import { getLocales } from "expo-localization";

import * as en from "./en";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    common: en.common,
  },
};

i18n.use(initReactI18next).init({
  // Not sure to use this compatibility
  // See: https://stackoverflow.com/questions/70493788/i18nextpluralresolver-your-environment-seems-not-to-be-intl-api-compatible-u
  // Error: i18next::pluralResolver: Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.
  compatibilityJSON: "v3",
  defaultNS: "common",
  resources,
  // lng: getLocales()[0].languageCode ?? "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
