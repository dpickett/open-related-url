import {
  Plugin,
  MarkdownView,
  Editor,
  Notice,
  TFile,
  Menu,
  TAbstractFile,
} from "obsidian";
import { resolveFrontMatter } from "src/resolveFrontMatter";
import { extractUrlSet } from "src/open-related-url/extractUrlSet";
import { UrlModal } from "./UrlModal";
import {
  DEFAULT_SETTINGS,
  OpenRelatedUrlPluginSettings,
} from "./PluginSettings";
import SettingTab from "./SettingTab";
import openUrl from "src/openUrl";
import { LinkMenuEvent } from "./LinkMenuEvent";

export default class OpenRelatedUrlPlugin extends Plugin {
  settings: OpenRelatedUrlPluginSettings;
  linkMenuEvent: LinkMenuEvent;

  async onload() {
    await this.loadSettings();
    this.registerEvent(
      this.app.workspace.on("file-open", (file: TFile) => {
        this.registerCommands(file);
      })
    );
    if (!this.linkMenuEvent) {
      this.linkMenuEvent = new LinkMenuEvent(this);
      this.linkMenuEvent.registerEvent();
    }
  }

  onunload() {
    if (this.linkMenuEvent) {
      this.linkMenuEvent.unregisterEvent();
    }
  }

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
      callback: () => {
        const frontMatter = resolveFrontMatter(app.metadataCache, file);
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

    this.addSettingTab(new SettingTab(this.app, this));
  }
}
