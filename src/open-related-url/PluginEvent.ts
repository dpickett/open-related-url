import { EventRef } from "obsidian";
import OpenRelatedUrlPlugin from "src/main";

export abstract class PluginEvent {
  eventRef: EventRef | null;
  constructor(protected plugin: OpenRelatedUrlPlugin) {}
  abstract buildEventHandler(): EventRef;

  registerEvent() {
    if (!this.eventRef) {
      this.eventRef = this.buildEventHandler();
      this.plugin.registerEvent(this.eventRef);
    }
  }

  unregisterEvent() {
    if (this.eventRef) {
      this.plugin.app.workspace.offref(this.eventRef);
      this.eventRef = null;
    }
  }
}
