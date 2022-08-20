import { EventRef, Notice, TFile } from "obsidian";
import openUrl from "src/openUrl";
import { resolveFrontMatter } from "src/resolveFrontMatter";
import { extractUrlSet } from "./extractUrlSet";
import OpenRelatedUrlPlugin from "./OpenRelatedUrlPlugin";
import { PluginEvent } from "./PluginEvent";
import { UrlModal } from "./UrlModal";

export class FileOpenEvent extends PluginEvent {
  buildEventHandler(): EventRef {
    return this.plugin.app.workspace.on("file-open", (file: TFile) => {
      this.registerCommands(file);
    });
  }

  private async registerCommands(file: TFile) {
    const { urlFrontMatterNameSuffix } = this.plugin.settings;
    // This adds an editor command that can perform some operation on the current editor instance
    this.plugin.addCommand({
      id: "open-related-url",
      name: "Open Related URL",
      callback: () => {
        const frontMatter = resolveFrontMatter(app.metadataCache, file);
        if (frontMatter) {
          const urlSet = extractUrlSet(frontMatter, {
            urlFrontMatterNameSuffix: urlFrontMatterNameSuffix,
          });
          new UrlModal(this.plugin.app, urlSet).open();
        }
      },
    });

    this.plugin.settings.quickNavigateNames.forEach((name) => {
      this.plugin.addCommand({
        id: `open-quick-url-${name}`,
        name: `Quick Nav - ${name}`,
        callback: () => {
          const frontMatter = resolveFrontMatter(app.metadataCache, file);

          let urlItem;
          if (frontMatter) {
            const urlSet = extractUrlSet(frontMatter, {
              urlFrontMatterNameSuffix: urlFrontMatterNameSuffix,
            });
            urlItem = urlSet.find((url) => url.name === name);
          }

          if (urlItem) {
            openUrl(urlItem.url);
          } else {
            new Notice(`URL for ${name} not found in frontmatter`);
          }
        },
      });
    });
  }
}
