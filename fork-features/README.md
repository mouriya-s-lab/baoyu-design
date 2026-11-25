# mouriya-s-lab fork 定制

本 fork 跟随 [jimliu/baoyu-design](https://github.com/jimliu/baoyu-design)，只叠加 omp 与 Tern 适配。

## omp-tern

| 改动 | 位置 |
|---|---|
| omp 工具映射与 Tern 显示步骤（agent 读） | `omp-tern/GUIDE.md` |
| 在 Tern 里把编辑器开成画中画、复用、关闭；对能评论的类型输出评论监听命令（`next`） | `omp-tern/show.mjs`（Node 20+，无依赖） |
| 四个 artifact skill 的入口 | `skills/{claude-slides,claude-design,claude-design-system,claude-data}/SKILL.md` 标题段后插入一段「In omp or Tern」，以及 `fork-features/omp-tern/` 的实体副本 `omp-tern/` |
| 副本一致性校验 | `omp-tern.test.mjs`，由 `npm test` 运行 |

`fork-features/omp-tern/` 是唯一的编辑位置。skills CLI 跳过指向 skill 目录外的软链接（`SKILLS_SYMLINK_OUTSIDE_SKILL`），所以每个 skill 内放实体副本。改完源文件后同步副本，否则 `npm test` 失败：

```sh
for s in claude-slides claude-design claude-design-system claude-data; do
  rm -rf skills/$s/omp-tern && cp -Rp fork-features/omp-tern skills/$s/omp-tern
done
```

`dataviz` 不起编辑器、不用 Claude Code 专属工具，不接入。`GUIDE.md` 只替换工具名、增加 `open` 之后的显示与评论监听步骤；格式、工艺规则和 NEVER VERIFY 仍以上游原文为准。

`show.mjs` 每次运行都向 Tern 查询 `tern browser {"op":"blocks"}`，按 `<root>/.artifact-server.json` 里的 `url` 前缀匹配已有 block，自身不记录状态。打开后执行 `release`，把 block 交还给用户。

## 安装

```sh
npx skills add mouriya-s-lab/baoyu-design -g -a codex -y \
  -s claude-slides -s claude-design -s claude-design-system -s claude-data -s dataviz
```

`-a codex` 安装到 `~/.agents/skills/`，omp 从该目录读取 skill。

更新：重跑上面的 `add` 命令覆盖安装，然后重启 omp。不要用 `npx skills update -g`：它会顺带更新全局所有其他来源的 skill。

## 上游同步

`.github/workflows/sync-upstream.yml` 每天把 upstream `main` 合入本 fork 的 `main`。可干净合并且 CI 通过的部分会自动合并；冲突部分留在 `sync/review` PR，需人工处理。最可能冲突的是四个 `SKILL.md` 中插入的那一段：保留上游新正文，把这段重新放回标题段之后。`package.json` 的 `test` 脚本追加了 `'fork-features/*.test.mjs'`，上游改动这一行时保留该参数。

上游改了工具用法（例如新增 `AskUserQuestion` 或后台命令的用法）时，要同步更新 `GUIDE.md` 的对照表。上游如果原生支持 omp 或 Tern，就删除对应的映射行。
