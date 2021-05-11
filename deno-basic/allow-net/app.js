/**
 *  $ deno run --allow-net=randomuser.me ./app.js
 * 
 *  $ deno compile --unstable --allow-net=randomuser.me --target=x86_64-pc-windows-msvc  app.js
 */
import * as users from "./users.js";
// import * as users from "https://raw.githubusercontent.com/garywu125/gy/main/users.js";

users.getUser()
  .then(user => {
    console.log(`Welcome to ${user.name.title}. ${user.name.last}`);
  });