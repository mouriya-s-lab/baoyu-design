# mouriya-s-lab fork 定制

本 fork 跟随 [jimliu/baoyu-design](https://github.com/jimliu/baoyu-design)，只叠加 omp 与 Tern 适配。

## omp-tern

| 改动 | 位置 |
|---|---|
| omp 工具映射与 Tern 显示步骤（agent 读） | `omp-tern/GUIDE.md` |
| 在 Tern 里把编辑器开成画中画、复用、关闭 | `omp-tern/show.mjs`（Node 20+，无依赖） |
| 四个 artifact skill 的入口 | `skills/{claude-slides,claude-design,claude-design-system,claude-dashboard}/SKILL.md` 标题段后插入一段「In omp or Tern」，以及 `omp-tern -> ../../fork-features/omp-tern` 软链接 |

`dataviz` 不起编辑器、不用 Claude Code 专属工具，不接入。`GUIDE.md` 只替换工具名、增加 `open` 之后的显示步骤；格式、工艺规则和 NEVER VERIFY 仍以上游原文为准。

`show.mjs` 每次运行都向 Tern 查询 `tern browser {"op":"blocks"}`，按 `<root>/.artifact-server.json` 里的 `url` 前缀匹配已有 block，自身不记录状态。打开后执行 `release`，把 block 交还给用户。

## 安装

```sh
npx skills add mouriya-s-lab/baoyu-design -g -a codex -y
```

`-a codex` 安装到 `~/.agents/skills/`，omp 从该目录读取 skill。skills CLI 复制 skill 目录时会解引用 `omp-tern` 软链接，安装后的每个 skill 内都有 `omp-tern/` 实体文件。更新：`npx skills update -g -y`，然后重启 omp。

## 上游同步

`.github/workflows/sync-upstream.yml` 每天把 upstream `main` 合入本 fork 的 `main`。可干净合并且 CI 通过的部分会自动合并；冲突部分留在 `sync/review` PR，需人工处理。最可能冲突的是四个 `SKILL.md` 中插入的那一段：保留上游新正文，把这段重新放回标题段之后。

上游改了工具用法（例如新增 `AskUserQuestion` 或后台命令的用法）时，要同步更新 `GUIDE.md` 的对照表。上游如果原生支持 omp 或 Tern，就删除对应的映射行。
