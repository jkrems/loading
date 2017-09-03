# Super unscientific startup comparison

Tested agains https://github.com/nodejs/node/pull/14369.

Generate the test directories:

```bash
make # or: node generate.js
```

On my machine the numbers are fairly consistent, with mjs being ~30% faster:

```
> time /path/to/node --experimental-modules cjs
(node:22085) ExperimentalWarning: The ESM module loader is experimental.
/path/to/node --experimental-modules cjs  1.42s user 0.16s system 104% cpu 1.521 total

> time /path/to/node --experimental-modules mjs
(node:22072) ExperimentalWarning: The ESM module loader is experimental.
/path/to/node --experimental-modules mjs  0.86s user 0.46s system 126% cpu 1.040 total
```
