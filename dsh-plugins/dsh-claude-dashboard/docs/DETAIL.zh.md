# Claude 数据看板改名为 Claude 数据

`dsh-claude-dashboard` 在 baoyu-design 2.14.0 改名为 `dsh-claude-data`。这个版本不带技能，它带来的是新版 `dsh-claude-artifacts`（baoyu-design 各插件共用的部分），由它提示换到新插件。

## 换到 Claude 数据

1. 在这个插件的页面上点 **Update**（更新），或者点左侧栏的「作品」，在更新里找到 `claude-dashboard → claude-data`。两处都还没有的话，退出应用重新打开。
2. 点 **Update**（更新）。它会先装上 `dsh-claude-data`（开关和这个插件一样），再卸载这个插件。
3. 新开一个会话，让 Agent 做看板，或者输入 `/claude-data`。

你做好的看板用新插件照样能打开，「作品」页上也都还在。

如果你的某个预设里写着 `dsh-claude-dashboard`，预设离不开它，这个插件就先留着：把那一行改成 `name: dsh-claude-data`，再卸载这个插件。

如果没有提示更新，就在插件页用插件名添加 `dsh-claude-data`（**Add plugin**），再卸载这个插件。
