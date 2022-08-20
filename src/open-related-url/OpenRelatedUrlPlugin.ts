import { Plugin, MarkdownView, Editor, Notice, TFile } from "obsidian";
import { resolveFrontMatter } from "src/resolveFrontMatter";
import { extractUrlSet } from "src/open-related-url/extractUrlSet";
import { UrlModal } from "./UrlModal";
import {
  DEFAULT_SETTINGS,
  OpenRelatedUrlPluginSettings,
} from "./PluginSettings";
import SettingTab from "./SettingTab";
import openUrl from "src/openUrl";

export default class OpenRelatedUrlPlugin extends Plugin {
  settings: OpenRelatedUrlPluginSettings;

  async onload() {
    await this.loadSettings();
    this.registerEvent(
      this.app.workspace.on("file-open", (file: TFile) => {
        this.registerCommands(file);
      })
    );
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  private async registerCommands(file: TFile) {
    const { urlFrontMatterNameSuffix } = this.settings;
    // This adds an editor command that can perform some operation on the current editor instance
    this.addCommand({
      id: "open-related-url",
      name: "Open Related URL",
      callback: async () => {
        const frontMatter = await resolveFrontMatter(app.metadataCache, file);
        if (frontMatter) {
          const urlSet = extractUrlSet(frontMatter, {
            urlFrontMatterNameSuffix: urlFrontMatterNameSuffix,
          });
          new UrlModal(this.app, urlSet).open();
        }
      },
    });

    this.settings.quickNavigateNames.forEach((name) => {
      this.addCommand({
        id: `open-quick-url-${name}`,
        name: `Quick Nav - ${name}`,
        callback: async () => {
          const frontMatter = await resolveFrontMatter(app.metadataCache, file);

          let urlItem;
          if (frontMatter) {
            const urlSet = extractUrlSet(frontMatter, {
              urlFrontMatterNameSuffix: urlFrontMatterNameSuffix,
            });
            console.log(urlSet);
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

    this.addSettingTab(new SettingTab(this.app, this));
  }
}
