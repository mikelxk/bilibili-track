#!/usr/bin/env -S deno run --allow-net --import-map=import_map.json
import { parse } from "std/flags/mod.ts";
import { readLines } from "std/io/buffer.ts";
import { green, red, yellow } from "std/fmt/colors.ts";
import { WatchType } from "./type.ts";
import { Api } from "./util.ts";
const args = parse(Deno.args);
const help = args.h || args.help;
if (import.meta.main) {
  if (help) {
    man();
  }
  const uid: number = args.u || args.uid;
  const av: number = args.a || args.av;
  const diffString: string = args.d ?? args.diff;
  const diff = (diffString ?? true) == "true";
  let watchType: WatchType;
  const interval = args.i || 5000; //defaults to 5s
  if ((uid && av) || !(uid || av)) {
    await man();
  }
  const param: number = uid || av;
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
      `${new Date().toLocaleTimeString()} : `,
      colorFunc(`${numAfter} ${diffStr}`),
    );
    numBefore = numAfter;
  }, interval);
}
async function man() {
  console.log(`
  OPTIONS:
      --uid value, -u            track a up's followers count by its uid

      --av value, -a             track a video's play count by its av number

      --diff boolean, -d         only show diff or not (default : false)

      --interval miliseconds, -i interval between each fetch (default : 5000ms)

      --help, -h                 show help

  Press enter to quit
  `);
  for await (const _line of readLines(Deno.stdin)) {
    Deno.exit(0);
  }
}
