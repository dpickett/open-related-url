import { Plugin, MarkdownView, Editor } from "obsidian";
import { resolveFrontMatter } from "src/resolveFrontMatter";
import { extractUrlSet } from "src/open-related-url/extractUrlSet";
import { UrlModal } from "./UrlModal";
import {
  DEFAULT_SETTINGS,
  OpenRelatedUrlPluginSettings,
} from "./PluginSettings";
import SettingTab from "./SettingTab";

export default class OpenRelatedUrlPlugin extends Plugin {
  settings: OpenRelatedUrlPluginSettings;

  async onload() {
    await this.loadSettings();

    // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
    const statusBarItemEl = this.addStatusBarItem();
    statusBarItemEl.setText("Status Bar Text");

    // This adds an editor command that can perform some operation on the current editor instance
    this.addCommand({
      id: "open-associated-url",
      name: "Open Associated Link",
      editorCallback: async (editor: Editor, view: MarkdownView) => {
        const frontMatter = await resolveFrontMatter(
          app.metadataCache,
          view.file
        );
        if (frontMatter) {
          const urlSet = extractUrlSet(frontMatter);
          new UrlModal(this.app, urlSet).open();
        }
      },
    });

    this.addSettingTab(new SettingTab(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
