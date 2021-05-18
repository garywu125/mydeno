/**
 *  Support remote import maps:
 * 
 *  remote import map with deps.ts
 * 
 *  deno run --import-map=https://raw.githubusercontent.com/garywu125/mydeno/main/deno-basic/remote_import_map/local_map/import_map.json colors.ts  
 * 
 */

//  import { red,green } from "./deps.ts";
//  import { helloWorld} from "./deps.ts"
import { 
        red,
        green,
        helloWorld
     } from "./deps.ts"; 


console.log(red("hello world"));
console.log(green(helloWorld()));