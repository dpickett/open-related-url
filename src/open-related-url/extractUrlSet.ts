import { FrontMatterCache } from "obsidian";
import { UrlOption } from "./UrlOption";

const defaultSuffix = "Url";
export const extractUrlSet = (
  frontMatter: FrontMatterCache,
  { urlFrontMatterNameSuffix = defaultSuffix } = {}
): UrlOption[] => {
  return Object.keys(frontMatter).reduce((urlSet, key) => {
    if (key.endsWith(urlFrontMatterNameSuffix)) {
      return [
        ...urlSet,
        {
          name: key.replace(urlFrontMatterNameSuffix, ""),
          url: frontMatter[key],
        },
      ];
    } else {
      return urlSet;
    }
  }, []);
};
