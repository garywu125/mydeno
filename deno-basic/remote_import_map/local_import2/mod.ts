// deno run --importmap import-map.json mod.ts
import { add } from "util/add";

console.log(`3 + 4 = ${ add(3, 4)}`)