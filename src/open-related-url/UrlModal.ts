import { App, FuzzySuggestModal } from "obsidian";
import openUrl from "src/openUrl";
import { UrlOption } from "./UrlOption";

export class UrlModal extends FuzzySuggestModal<UrlOption> {
  urlOptions: UrlOption[];

  constructor(app: App, urlOptions: UrlOption[]) {
    super(app);
    this.urlOptions = urlOptions;
  }

  getItems(): UrlOption[] {
    return this.urlOptions;
  }
  getItemText(item: UrlOption): string {
    return item.name;
  }
  onChooseItem(item: UrlOption, evt: MouseEvent | KeyboardEvent): void {
    openUrl(item.url);
  }
}
