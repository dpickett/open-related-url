# Open Related URL - An Obsidian Plugin

An obsidian plugin. On any given note, you can use this to open urls that are mentioned in the note's [YAML front matter](https://help.obsidian.md/Advanced+topics/YAML+front+matter).

## Use Cases

Obsidian is great for notes, and I often need to correlate my notes with a task list or a set of files. If you follow Tiago Forte's [PARA](https://fortelabs.co/blog/para/) method, he recommends you have a similar folder structure across all of your systems.

For me, the two most useful things to correlate are tasks and files. If you supply a `tasksUrl` that perhaps points to Asana or Clickup, you can open the correlating URL in seconds. This is also true if you supply a `filesUrl` that may point to a Google Drive or Dropbox folder.

## Overview Video

<iframe width="770" height="433" src="https://www.youtube.com/embed/S-1r0Z7nPgo" title="Open a Related URL in Obsidian with a New Plugin" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Open Related Url Command

Let's imagine you have an Obsidian note with the following YAML frontmatter:

```yaml
alias: "Build Widgets"
taskUrl: https://clickup.com
fileUrl: https://drive.google.com
```

When you open the command palette and invoke the `Open Related URL` command, it will search your frontmatter to look for keys that end in `Url` (by default: this a setting you can override in your settings).

The plugin will then present you with all of the options that met the conditions above. When you select one, it will open the correlating URL.

## Quick Nav

If you have url frontmatter keys that you consistently use in your note metadata, you can add obsidian keybindings to quickly navigate to those Urls.

### Define Quick Urls in Your Settings

In your plugin settings for Open Related URL, supply the names of the common keys in a comma delimited list. Do not include the Url suffix. My setting is set to `task, file` so that I can configure quick URLs for `taskUrl` and `fileUrl` keys respectively.

### Map Your Keybindings

Once you've specified your Quick Urls, you can map keybindings by pressing the hotkeys button next to "Open Related URL" in your Community Plugins menu.

### Trigger Your Keybindings

When in a note that has your previously configured Quick Url in the front matter, use the newly assigned keybinding to quickly navigate to where you want to go.
