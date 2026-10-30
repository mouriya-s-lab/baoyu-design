#!/usr/bin/env node
// Shows an artifact editor started by `artifact.mjs open <root>` inside Tern, over the pane that runs the agent.
//
//   node show.mjs <root>           open the editor as a Tern browser picture in picture (reuses one already showing it)
//   node show.mjs <root> --close   close the Tern browser blocks showing this editor (run before `artifact.mjs stop`)
//
// Prints one JSON object. Outside a Tern pane nothing is opened: {"shown":"none","url"}. For the kinds whose editor
// takes comments (slides, design, design-system), `next` is the command that listens for comments sent to the agent.
// Tern owns its blocks: every run asks `tern browser {"op":"blocks"}` and keeps no record of its own.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const STATE_FILE = ".artifact-server.json";
const COMMENT_KINDS = new Set(["slides", "design", "design-system"]);

/** @typedef {{ kind: "tern", exe: string, pane: number } | { kind: "none", reason: string }} Host */
/** @typedef {{ block: number, url: string, owner: number | null, shown: boolean, driven: boolean }} BrowserBlock */
/** @typedef {{ url: string, kind: string }} Editor */

class CliError extends Error {
  /** @param {string} code @param {string} message @param {number} exit */
  constructor(code, message, exit) {
    super(message);
    this.code = code;
    this.exit = exit;
  }
}

/** @param {NodeJS.ProcessEnv} env @returns {Host} */
function detectHost(env) {
  if (env.TERM_PROGRAM !== "tern") return { kind: "none", reason: "not in a Tern pane (TERM_PROGRAM is not tern)" };
  const pane = Number(env.TERN_PANE);
  if (!Number.isSafeInteger(pane) || pane <= 0) return { kind: "none", reason: "TERN_PANE is not set to a block id" };
  return { kind: "tern", exe: env.TERN_EXE || "tern", pane };
}

/** @param {string} root @returns {Editor} */
function editorState(root) {
  const file = path.join(root, STATE_FILE);
  let text;
  try {
    text = readFileSync(file, "utf8");
  } catch {
    throw new CliError("NOT_RUNNING", `${file} not found: run \`artifact.mjs open ${root}\` first.`, 2);
  }
  const { url, kind } = JSON.parse(text);
  if (typeof url !== "string" || !/^https?:\/\//.test(url)) {
    throw new CliError("BAD_STATE", `${file} has no editor url: run \`artifact.mjs open ${root}\` again.`, 2);
  }
  return { url, kind: typeof kind === "string" ? kind : "unknown" };
}

/** The comment wait for this editor, or undefined when its kind takes no comments. @param {string} root @param {Editor} editor */
function commentWait(root, { kind }) {
  if (!COMMENT_KINDS.has(kind)) return undefined;
  // argv[1] keeps the skill-folder path the script was run by (installed copies hold real files beside scripts/).
  const script = path.join(path.dirname(path.resolve(process.argv[1])), "..", "scripts", "artifact.mjs");
  const artifact = existsSync(script) ? script : "<this skill's folder>/scripts/artifact.mjs";
  return (
    "Unless one already runs for this root: listen for comments sent from the editor with bash async: true, timeout: 0 " +
    `running: node ${JSON.stringify(artifact)} comments ${JSON.stringify(root)} --wait`
  );
}

/** @param {string} exe @param {Record<string, unknown>} op */
function ternBrowser(exe, op) {
  const run = spawnSync(exe, ["browser", JSON.stringify(op)], { encoding: "utf8" });
  if (run.error) throw new CliError("TERN_UNAVAILABLE", `${exe}: ${run.error.message}`, 1);
  let answer;
  try {
    answer = JSON.parse(run.stdout);
  } catch {
    throw new CliError("TERN_FAILED", `tern browser ${op.op}: ${(run.stderr || run.stdout).trim()}`, 1);
  }
  if (answer.error) throw new CliError("TERN_FAILED", `tern browser ${op.op}: ${answer.error.message}`, 1);
  return answer.ok;
}

/** @param {string} exe @param {string} url @returns {BrowserBlock[]} */
function blocksShowing(exe, url) {
  /** @type {BrowserBlock[]} */
  const blocks = ternBrowser(exe, { op: "blocks" }).blocks;
  return blocks.filter((b) => b.url.startsWith(url));
}

/** @param {string} root @param {Host} host */
function show(root, host) {
  const editor = editorState(root);
  const { url } = editor;
  const next = commentWait(root, editor);
  if (host.kind === "none") return { shown: "none", url, reason: host.reason, next };
  const existing = blocksShowing(host.exe, url);
  if (existing.length) return { shown: "tern", url, block: existing[0].block, reused: true, next };
  const { block } = ternBrowser(host.exe, { op: "open", owner: host.pane, url });
  // An opened block starts driven by automation; hand it to the person as an ordinary browser block.
  ternBrowser(host.exe, { op: "release", block });
  return { shown: "tern", url, block, reused: false, next };
}

/** @param {string} root @param {Host} host */
function close(root, host) {
  const { url } = editorState(root);
  if (host.kind === "none") return { closed: [], url, reason: host.reason };
  const closed = blocksShowing(host.exe, url).map(({ block }) => {
    ternBrowser(host.exe, { op: "close", block });
    return block;
  });
  return { closed, url };
}

function main(argv) {
  const args = argv.filter((a) => a !== "--close");
  if (args.length !== 1 || argv.length - args.length > 1) {
    throw new CliError("USAGE", "usage: node show.mjs <root> [--close]", 2);
  }
  const root = path.resolve(args[0]);
  const host = detectHost(process.env);
  return argv.includes("--close") ? close(root, host) : show(root, host);
}

try {
  process.stdout.write(JSON.stringify(main(process.argv.slice(2)), null, 2) + "\n");
} catch (err) {
  if (!(err instanceof CliError)) throw err;
  process.stdout.write(JSON.stringify({ error: err.code, message: err.message }, null, 2) + "\n");
  process.exitCode = err.exit;
}
