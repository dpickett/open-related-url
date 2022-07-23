import { FrontMatterCache } from "obsidian";
import { UrlOption } from "./UrlOption";

const requiredSuffix = "Url";
export const extractUrlSet = (frontMatter: FrontMatterCache): UrlOption[] => {
  return Object.keys(frontMatter).reduce((urlSet, key) => {
    if (key.endsWith(requiredSuffix)) {
      return [
        ...urlSet,
        {
          name: key.replace(requiredSuffix, ""),
          url: frontMatter[key],
        },
      ];
    } else {
      return urlSet;
    }
  }, []);
};
