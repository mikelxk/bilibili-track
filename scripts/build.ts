#!/usr/bin/env -S deno run --allow-run
const build = Deno.run({
  cmd: [
    "deno",
    "compile",
    "--allow-net",
    "--allow-run",
    "--output",
    `bili-track`,
    "--import-map=import_map.json",
    "mod.ts",
  ],
});
await build.status();
