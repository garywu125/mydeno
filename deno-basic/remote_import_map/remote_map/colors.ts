/**
 *  Support remote import maps:
 * 
 *  deno run --import-map=https://raw.githubusercontent.com/garywu125/mydeno/main/deno-basic/remote_import_map/local_map/import_map.json colors.ts  
 * 
 */

 import { red,green } from "fmt/colors.ts";
 import { helloWorld} from "./hello_world.ts"


console.log(red("hello world"));
console.log(green(helloWorld()));