// terminal color output : using deno std library colors instead of third party chalk 

import * as Colors from "https://deno.land/std@0.97.0/fmt/colors.ts"

console.log( Colors.green(` I am a green line ${Colors.blue(Colors.bold(Colors.underline('Hello world! ')))} that becomes green again! `))

console.log( Colors.bgBrightGreen(` I am a green line ${Colors.blue(Colors.bold(Colors.underline('Hello world! ')))} that becomes green again! `))

