import {
  MenuItem,
  MetadataCache,
  TFile,
  Menu,
  TAbstractFile,
  EventRef,
} from "obsidian";
import openUrl from "src/openUrl";
import { resolveFrontMatter } from "src/resolveFrontMatter";
import { extractUrlSet } from "./extractUrlSet";
import OpenRelatedUrlPlugin from "./OpenRelatedUrlPlugin";
import { PluginEvent } from "./PluginEvent";

export class LinkMenuEvent extends PluginEvent {
  eventRef: EventRef | null;

  buildEventHandler() {
    return this.plugin.app.workspace.on(
      "file-menu",
      (menu: Menu, file: TAbstractFile, source: string) => {
        if (
          source === "link-context-menu" &&
          file instanceof TFile &&
          file.extension === "md"
        ) {
          this.addMenuItems(menu, file, this.plugin.app.metadataCache);
        }
      }
    );
  }

  private addMenuItems(menu: Menu, file: TFile, metaData: MetadataCache) {
    const frontMatter = resolveFrontMatter(metaData, file);
    if (frontMatter) {
      const urlSet = extractUrlSet(frontMatter);

      menu.addSeparator();
      urlSet.forEach((urlOption) => {
        menu.addItem((item) => {
          item
            .setTitle(`Related Url: ${urlOption.name}`)
            .setIcon("link")
            .onClick(async () => {
              openUrl(urlOption.url);
            });
        });
      });
    }
  }
}
