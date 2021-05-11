/**
 *  $ deno --allow-env --allow-read app.ts
 *  Safe Mode:
 *    display envroment variable value && validate required enviroment variable in env.example
 * 
 *  using colors/printf from fmt module
 *  
 */
import { config as dotenvConfig} from "./depts.ts";
import * as Colors from "https://deno.land/std/fmt/colors.ts"
import { printf } from "https://deno.land/std/fmt/printf.ts";



checkEnvConfig()
console.log(Deno.env.get("APPLICATION_NAME"))

const person = { name: "deepak", salary: 2000 };
const address = { street: "221B baker street london", zip: 20000 };
printf(
  "Person info: name: %s salary: %s and Address: street: %s \n",
  Colors.bgYellow(Colors.brightWhite(person.name)),
  Colors.red(String(person.salary)),
  Colors.yellow(address.street)
);

function checkEnvConfig():void {
    try {
        // required env variable
        //  let appConfig=dotenvConfig({ safe: true ,export:true})
    
        // optional with default env variable
         let appConfig=dotenvConfig({ export:true})         
         console.log(Colors.blue("[info] ")+"successfully get required environment variable \n",appConfig)
    } catch (e) {
        console.log(Colors.red("[error] ")+"Required Env Variable Missing:\n\n",e)    
        Deno.exit(-1)
    }  
}