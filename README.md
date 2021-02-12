# Track Bilibili followers V2

## Switched to deno and ts

## Usage

[Download deno](https://deno.land/)

- directly run the ts file

```shell
./mod.ts -u $uuid -i $interval
```

or

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
