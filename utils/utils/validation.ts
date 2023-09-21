import { TFunction } from "i18next";
import { Alert } from "react-native";

export const UrlRegexPattern = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i" // fragment locator
);

export const updateURLWithSchema = <T>(
  fieldname: keyof T,
  setValue: (fieldname: keyof T, value: string) => void,
  schema: "http://" | "https://",
  url: string
) => {
  const updatedURL = schema + url;
  setValue(fieldname, updatedURL);
};
// Please select a schema for the URL
export const promptUserForURLSchemaIfNotExists = <T>(
  t: TFunction,
  serverURL: string,
  inputFieldName: keyof T,
  setValue: (fieldname: keyof T, value: string) => void
) => {
  // Check if the URL has a schema (e.g., http:// or https://)
  if (!/^https?:\/\//i.test(serverURL)) {
    Alert.alert(
      t("common:validation:urlSchemaRequired"),
      t("common:validation:pleaseSelectSchema") as string,
      [
        {
          text: "HTTP",
          onPress: () =>
            updateURLWithSchema(inputFieldName, setValue, "http://", serverURL),
        },
        {
          text: "HTTPS",
          onPress: () =>
            updateURLWithSchema(
              inputFieldName,
              setValue,
              "https://",
              serverURL
            ),
        },
        {
          text: t("common:cancel") as string,
          style: "cancel",
        },
      ]
    );
    return false;
  }
  return true;
};
