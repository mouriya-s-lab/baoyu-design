# dsh-claude-dashboard

**Renamed [`dsh-claude-data`](https://www.npmjs.com/package/dsh-claude-data)** in
[baoyu-design](https://github.com/JimLiu/baoyu-design) 2.14.0, when the Dashboard type became Data. Install that one.

This package has no skill. Its versions after the rename are there for someone who still has it installed: updating it
brings the current [`dsh-claude-artifacts`](https://www.npmjs.com/package/dsh-claude-artifacts), whose Artifacts page
offers the move as an update, `claude-dashboard → claude-data`. **Update** installs `dsh-claude-data`, switched on or off
as this one is, then uninstalls this one. The dashboards made with it open in the new one as they are. See
[Update](https://github.com/JimLiu/baoyu-design/blob/main/dsh-plugins/README.md#update) for the rest, such as a preset that
names this plugin.

## What is inside

- `lib/index.js`: the plugin, which does nothing. It is there so that a preset that names `dsh-claude-dashboard` still loads.
- `cordis.patch.yml`: the bundle layer, with the rows the releases before the rename had: this plugin's (`claude-dashboard`),
  and its row of `dsh-claude-artifacts` (`claude-artifacts-dashboard`).

## License

MIT, in `LICENSE`. `NOTICE.md` sets out what in the baoyu-design plugins is not.
