# Running this skill in omp and Tern

This skill's pages were written for Claude Code. In omp (oh-my-pi), and in omp inside a Tern pane, read
them through this page: it swaps their tool names for omp's and adds one step after `open`. The format,
craft, Creating/Revising order, `check` loop and the NEVER VERIFY rule stay exactly as the pages say.

## This skill's folder

`skill://<name>` is how omp reads this skill (`read skill://claude-slides/artifact-type/reference/format.md`).
Programs run from `bash` do not resolve `skill://`, so get the folder's real path once, then use it in every
command where the pages say `<this skill's folder>`:

```sh
realpath skill://claude-slides        # → /Users/…/.agents/skills/claude-slides
node /Users/…/.agents/skills/claude-slides/scripts/artifact.mjs check designs/q3-review
```

## Tools

| The pages say | In omp |
|---|---|
| your file tool, Write, Edit; "parallel Writes", "in ONE message" | `write` for a new file, `edit` for an existing one; several calls in the same message run in parallel. |
| one `AskUserQuestion` call of at most 4 questions | one `ask` call with the same questions. Per question: `header` → `header`; `question` → `question`; each option's `label` (without "(Recommended)") → `label`, its `description` → `tradeoff`; the "(Recommended)" option's index → `recommended`; add `id` and a `brief` (`where`: what you read, `what`: why it is open, `how`: what each answer changes). `ask` takes one option per question; for `"multiSelect": true` add "or type several" to the question, the person types a combination as their own answer. `ask` adds its own free-text answer, like the card's "Other". `metadata` has no counterpart: drop it. An answer `(timed out …)` or `(cancelled)` is nobody answering: decide, build, state your assumptions in one line. |
| run `comments <root> --wait` as a background command that tells you when it exits | `bash` with `async: true` and `timeout: 0` (no deadline), started right after `open` (the `next` of `show.mjs`, below) and kept running while the page is open: without it the editor has no **Send to agent** button. The thread arrives as a follow-up message when the person presses **Send to agent**; never poll it or `wait` on it. Handle it, reply, then start the wait again (its `next`). One wait per `<root>`; before `stop <root>`, cancel it: `write proc://<job id>/kill`. |
| `via` in a design system's `lastChange`: the surface you run in | `omp` |
| `/design-sync`, the appifacts plugin, `appifacts-design-system-from-code`, Cowork, connectors | Claude Code and claude.ai tools; omp has none of them. A system with `"editing": "code"` is kept in sync by `/design-sync` outside this session: say so, and leave it to the person to run it there. Skip `from-code.md` step 9's offer of the producer folder. |

## The editor in Tern

Right after every `open <root>` (Creating, Revising's "the link", or when the person asks for the editor),
run this skill's `omp-tern/show.mjs` in the same `bash` call:

```sh
S=/Users/…/.agents/skills/claude-slides     # this skill's folder; the dashboard's `A` is $S/scripts/artifact.mjs
node $S/scripts/artifact.mjs open designs/q3-review && node $S/omp-tern/show.mjs designs/q3-review
```

It prints JSON:

- `{"shown":"tern","block","url","reused","next"}`: inside a Tern pane the editor now floats as a picture in
  picture over this pane (`reused: true`: a block already showed it, left where the person put it). Tell
  the person the editor is open beside the chat, and give `url` once.
- `{"shown":"none","url","reason","next"}`: not in a Tern pane; give `url` once, as the pages say.
- `{"error","message"}`: Tern refused; give `url` once and name the error in a line.

`next` (slides, design and design-system; a dashboard takes no comments) is the comment wait. Start it in
the same message unless one already runs for this `<root>`. It runs alongside the rest of the work; the
person's comments arrive as follow-up messages, also after your reply has ended.

The block is for the person to watch and edit. Never `snapshot`, `capture`, `eval` or read it, and never
open it with the `browser` tool: NEVER VERIFY still holds.

To end the editor: `node $S/omp-tern/show.mjs <root> --close`, then `artifact.mjs stop <root>`. Close
first: `stop` removes the state file `show.mjs` finds the editor by.
