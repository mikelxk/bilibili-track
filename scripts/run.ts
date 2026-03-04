#!/usr/bin/env bun
const proc = Bun.spawn(["bun", "run", "mod.ts", ...Bun.argv.slice(2)], {
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});
const exitCode = await proc.exited;
process.exit(exitCode);
