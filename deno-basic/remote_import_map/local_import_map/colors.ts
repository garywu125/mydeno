/**
 *  local import map :
 *  deno run --import-map=import_map.json colors.ts 
 *  setup import_map.json to use local module via "/"
 * 
 */

import { red,green } from "fmt/colors.ts";
import { helloWorld} from "./hello_world.ts"
import { validate, required, isNumber } from "https://deno.land/x/validasaur/mod.ts";

const inputs = {
  name: "",
  age: "20"
};

const [ passes, errors ] = await validate(inputs, {
  name: required,
  age: [required, isNumber]
});

console.log({ passes, errors });

console.log(red("hello world"));

console.log(green(helloWorld()));