const p = Deno.run({
  cmd: [
    "deno",
    "compile",
    "--unstable",
    "--lite",
    "-A",
    "--output",
    `fancount-${Deno.build.os}`,
    "--import-map=import_map.json",
    "mod.ts",
  ],
});
await p.status();
