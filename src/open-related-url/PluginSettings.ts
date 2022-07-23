export const DEFAULT_SETTINGS: OpenRelatedUrlPluginSettings = {
  quickNavigateNames: [],
  urlFrontMatterNameSuffix: "Url",
};

export interface OpenRelatedUrlPluginSettings {
  quickNavigateNames: string[];
  urlFrontMatterNameSuffix: string;
}
