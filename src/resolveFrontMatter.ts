import { FrontMatterCache, MetadataCache, TFile } from "obsidian";

export const resolveFrontMatter = (
  metaDataCache: MetadataCache,
  file: TFile
): FrontMatterCache | undefined => {
  return metaDataCache.getFileCache(file)?.frontmatter;
};
