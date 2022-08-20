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
import { FileOpenEvent } from "./FileOpenEvent";

export default class OpenRelatedUrlPlugin extends Plugin {
  settings: OpenRelatedUrlPluginSettings;
  linkMenuEvent: LinkMenuEvent;
  fileOpenEvent: FileOpenEvent;

  async onload() {
    await this.loadSettings();

    if (!this.linkMenuEvent) {
      this.linkMenuEvent = new LinkMenuEvent(this);
      this.linkMenuEvent.registerEvent();
    }

    if (!this.fileOpenEvent) {
      this.fileOpenEvent = new FileOpenEvent(this);
      this.fileOpenEvent.registerEvent();
    }

    this.addSettingTab(new SettingTab(this.app, this));
  }

  onunload() {
    if (this.linkMenuEvent) {
      this.linkMenuEvent.unregisterEvent();
    }
    if (this.fileOpenEvent) {
      this.fileOpenEvent.unregisterEvent();
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
