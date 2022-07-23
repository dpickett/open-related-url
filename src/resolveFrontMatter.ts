import { FrontMatterCache, MetadataCache, TFile } from "obsidian";

export const resolveFrontMatter = async (
  metaDataCache: MetadataCache,
  file: TFile
): Promise<FrontMatterCache | undefined> => {
  return metaDataCache.getFileCache(file)?.frontmatter;
};
