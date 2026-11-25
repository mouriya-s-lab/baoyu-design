# Claude Dashboard is now Claude Data

`dsh-claude-dashboard` was renamed `dsh-claude-data` in baoyu-design 2.14.0. This version of it has no skill. What it
brings is the current `dsh-claude-artifacts`, the part the baoyu-design plugins share, and that one offers the move.

## Moving to Claude Data

1. Click **Update** on this plugin's page, or click **Artifacts** in the left sidebar and find
   `claude-dashboard → claude-data` among the updates there. If neither is there yet, quit and reopen the app.
2. Click **Update**. It installs `dsh-claude-data`, switched on or off as this plugin is, then uninstalls this plugin.
3. Start a new session, and ask for a dashboard or type `/claude-data`.

The dashboards you made open in the new one as they are, and stay on the Artifacts page.

If a preset of yours names `dsh-claude-dashboard` among its plugins, this plugin stays, since the preset needs it: change
that line to `name: dsh-claude-data`, then uninstall this plugin.

If no update is offered, install `dsh-claude-data` on the Plugins page (**Add plugin**, by name), then uninstall this
plugin.
