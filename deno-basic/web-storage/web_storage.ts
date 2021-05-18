/**
 *  first run
 *  $ deno run --location http://localhost:8080 web_storage.ts mykey myvalue
 * 
 *  verify web storage
 *  $ deno repl --location http://localhost:8080
 *  > localStorage.key(0)
 *    "mykey"
 *  > localStorage.getItem("mykey")
 *   "myvalue"
 *  
 *  second run
 * $ deno run --location http://localhost:8080 web_storage.ts yourkey yourvalue
 * > localStorage.key(1)
 *    "yourkey"
 *  > localStorage.getItem("yourkey")
 *   "yourvalue"
 */

const key = Deno.args[0];

if (!key) {
  // if user passes no args, display total records 
  console.log("total records :",localStorage.length);
} else {
  const value = Deno.args[1];

  if (value) { // set value if present
     localStorage.setItem(key, value);
  } else { 
    console.log(localStorage.getItem(key));
  }
}