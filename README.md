# Track Bilibili V2

## Track bilibili up's followers and video's views

## Params

```shell
OPTIONS:
    --uid value, -u            track a up's followers count by its uid

    --av value, -a             track a video's play count by its av number

    --diff boolean, -d         only show diff or not (default : false)

    --interval miliseconds, -i interval between each fetch (default : 5000ms)

    --help, -h                 show help
```

## Usage

[Download Bun](https://bun.sh/)

- run via bun

```shell
bun run mod.ts -u $uuid -i $interval
```

- or use predefined scripts

```shell
bun run run:nanami
bun run run:lex
```

## Install

No external dependencies are required beyond Bun, but you can install type definitions using:

```shell
bun install
```

## Build

```shell
bun run build
```

will generate a standalone executable under `./` named `bili-track` which includes the runtime.

## TODO:

- ~~add color~~
- ~~add more options in cli(i.e interval)~~
- add graph
- ~~use a smarter arg parser~~