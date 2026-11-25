import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FORK_DIR = path.dirname(fileURLToPath(import.meta.url));
const SOURCE = path.join(FORK_DIR, 'omp-tern');
const SKILLS = ['claude-slides', 'claude-design', 'claude-design-system', 'claude-data'];

for (const skill of SKILLS) {
  test(`skills/${skill}/omp-tern is a real copy of fork-features/omp-tern`, () => {
    const copy = path.join(FORK_DIR, '..', 'skills', skill, 'omp-tern');
    assert.ok(fs.lstatSync(copy).isDirectory(), `${copy} must be a directory, not a symlink`);
    assert.deepEqual(fs.readdirSync(copy).sort(), fs.readdirSync(SOURCE).sort());
    for (const name of fs.readdirSync(SOURCE)) {
      const from = path.join(SOURCE, name);
      const to = path.join(copy, name);
      const stat = fs.lstatSync(to);
      assert.ok(stat.isFile(), `${to} must be a regular file`);
      assert.equal(stat.mode & 0o111, fs.statSync(from).mode & 0o111, `${to} executable bits differ`);
      assert.ok(fs.readFileSync(to).equals(fs.readFileSync(from)), `${to} differs from ${from}`);
    }
  });
}
