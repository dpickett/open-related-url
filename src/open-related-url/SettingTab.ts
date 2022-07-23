import { PluginSettingTab, App, Setting } from "obsidian";
import OpenRelatedUrlPlugin from "./OpenRelatedUrlPlugin";
export default class SettingTab extends PluginSettingTab {
  plugin: OpenRelatedUrlPlugin;

  constructor(app: App, plugin: OpenRelatedUrlPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h2", { text: "Open related URL settings" });

    new Setting(containerEl)
      .setName("Frontmatter Suffix")
      .setDesc(
        "For open-related-url to recognize urls in the front matter, what must key end with?"
      )
      .addText((text) => {
        text
          .setPlaceholder('usually "Url" or "Address"')
          .setValue(this.plugin.settings.urlFrontMatterNameSuffix)
          .onChange(async (value) => {
            this.plugin.settings.urlFrontMatterNameSuffix = value;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName("Quick Urls")
      .setDesc(
        "Provide a list of urls often found in front matter for quick navigation. You can assign hotkeys to these quick URLs"
      )
      .addText((text) =>
        text
          .setPlaceholder("separate by commas")
          .setValue(this.plugin.settings.quickNavigateNames.join(", "))
          .onChange(async (value) => {
            this.plugin.settings.quickNavigateNames = value
              .split(",")
              .map((name) => name.trim());
            await this.plugin.saveSettings();
          })
      );
  }
}
