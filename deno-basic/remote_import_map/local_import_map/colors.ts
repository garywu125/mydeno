/**
 *  local import map :
 *  deno run --import-map=import_map.json colors.ts 
 *  setup import_map.json to use local module via "/"
 * 
 */

import { red,green } from "fmt/colors.ts";
import { helloWorld} from "./hello_world.ts"

console.log(red("hello world"));

console.log(green(helloWorld()));