#!/usr/bin/env dzx
/// <reference path="https://deno.land/x/dzx@0.2.3/types.d.ts" />

$.verbose = true;
$.shell = "/usr/local/bin/zsh";

console.log(`Hello from ${$.blue.bold("dzx")}!`);

const branch = await $`git branch --show-current`;
await $`dep deploy --branch=${branch}`;

// Print command output to stdout. Will be reverted to "piped" after all async ops are done.
$.stdout = "inherit";
$.stderr = "inherit";
await Promise.all([
  $`deno lint`,
  $`deno fmt --check`,
  $`deno test --allow-all`,
]);

const name = "foo bar";
await $`mkdir ./tmp/${name}`; // Params will be quoted if required: /tmp/'foo bar'.

cd("tmp/foo bar");
console.log(Deno.cwd()); // ./tmp/foo bar

cd("tmp");
console.log(Deno.cwd()); // ./tmp

await async.delay(1000);
const basename = path.basename(import.meta.url);
const stdin = await io.readAll(Deno.stdin);
await fs.ensureDir("./tmp");