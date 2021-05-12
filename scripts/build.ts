#!/usr/bin/env -S deno run --allow-run
const build = Deno.run({
  cmd: [
    "deno",
    "compile",
    "--unstable",
    "--allow-net",
    "--output",
    `bili-track`,
    "--import-map=import_map.json",
    "mod.ts",
  ],
});
await build.status();
