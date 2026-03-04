#!/usr/bin/env bun
import { parseArgs } from "util";
import readline from "readline/promises";
import { WatchType } from "./type.ts";
import { Api } from "./util.ts";

const green = (str: string | number) => `\x1b[32m${str}\x1b[0m`;
const red = (str: string | number) => `\x1b[31m${str}\x1b[0m`;
const yellow = (str: string | number) => `\x1b[33m${str}\x1b[0m`;

const { values: args } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    uid: { type: "string", short: "u" },
    av: { type: "string", short: "a" },
    diff: { type: "string", short: "d" },
    interval: { type: "string", short: "i" },
    help: { type: "boolean", short: "h" },
  },
  strict: false,
});

const help = args.help;

if (import.meta.main) {
  if (help) {
    await man();
  }
  const uid = args.uid ? parseInt(args.uid) : undefined;
  const av = args.av ? parseInt(args.av) : undefined;
  const diffString: string | undefined = args.diff;
  const diff = (diffString ?? "true") == "true";
  let watchType: WatchType;
  const interval = args.interval ? parseInt(args.interval) : 5000; //defaults to 5s

  if ((uid && av) || !(uid || av)) {
    await man();
  }
  const param = uid || av!;

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

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  for await (const _line of rl) {
    process.exit(0);
  }
}
