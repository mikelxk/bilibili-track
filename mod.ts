#!/usr/bin/env -S deno run --unstable --allow-net --import-map=import_map.json
import { parse } from "std/flags/mod.ts";
import { readLines } from "std/io/bufio.ts";
import { green, red, yellow } from "std/fmt/colors.ts";
import { Api, WatchType } from "./type.ts";
const args = parse(Deno.args);
const uid: number | undefined = args.u || args.uid;
const av: number | undefined = args.a || args.av;
const diffString: string = args.d ?? args.diff;
const diff = (diffString ?? true) == "true";
let watchType: WatchType;
const interval = args.i || 5000; //defaults to 5s
if ((uid && av) || !(uid || av)) {
  await man();
}
const param: number | undefined = uid || av;
if (uid) {
  watchType = "uid";
} else {
  watchType = "av";
}
const api = new Api(watchType, param);
console.log(`${api.watchType} : ${api.parameter}`);
let numBefore = 0;
setInterval(async () => {
  const numAfter = await api.getCount();
  const numChanged = numAfter - numBefore;
  let diffStr: string;
  let colorFunc = yellow;
  if (numAfter == numBefore) {
    if (diff) {
      return;
    }
    colorFunc = yellow;
    diffStr = "~~";
  } else if (numAfter > numBefore) {
    colorFunc = green;
    diffStr = `+${numChanged}`;
  } else {
    colorFunc = red;
    diffStr = `${numChanged}`;
  }
  console.log(
    `${new Date().toLocaleString()} : `,
    colorFunc(`${numAfter} ${diffStr}`),
  );
  numBefore = numAfter;
}, interval);
async function man() {
  console.log(`
  -u uuid     watch a up's count
  -a av       watch a video's count
  -i interval set interval between each fetch

  Press enter to quit
  `);
  for await (const _line of readLines(Deno.stdin)) {
    Deno.exit(0);
  }
}
