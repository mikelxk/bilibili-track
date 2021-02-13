# Track Bilibili V2

## Track bilibili up's followers and video's views

## Params

```shell
OPTIONS:
    --uid value, -u            track a up's followers count by its uid

    --av value, -a             track a video's play count by its av number

    --diff boolean, -d         only show diff or not (default : false)

    --interval miliseconds, -i interval between each fetch (default : 5000ms)
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
## Install
```shell
deno install --allow-run -f --root . .\scripts\run.ts
```
will generate a .bat or .shell file under `./bin` to run app
## Build:

```shell
deno run -A ./scripts/build.ts
```

will generate executable under `./` which includes the runtime

## TODO:

- ~~add color~~
- ~~add more options in cli(i.e interval)~~
- add graph
