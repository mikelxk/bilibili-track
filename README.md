# Track Bilibili V2

## Track bilibili up's followers and video's views

## Params

```shell
OPTIONS:
    --uid value, -u            track a up's followers count by its uid

    --av value, -a             track a video's play count by its av number

    --diff boolean, -d         only show diff or not (default: true)

    --interval miliseconds, -i interval between each fetch
```

## Usage

[Download deno](https://deno.land/)

- directly run the ts file (Linux and Mac)

```shell
./mod.ts -u $uuid -i $interval
```

- or (Win)

```shell
deno run --unstable -A --import-map=import_map.json mod.ts
```

## Build:

```shell
deno run -A ./scripts/build.ts
```

will generate executable

## TODO:

- ~~add color~~
- ~~add more options in cli(i.e interval)~~
- add graph
