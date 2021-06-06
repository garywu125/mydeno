let resp = await fetch('http://wttr.in')
if (resp.ok) {
  // const body = new Uint8Array(await resp.arrayBuffer());
  // await Deno.stdout.write(body);
  console.log(await resp.text())  
}

// read content of local file
let content = await Deno.readTextFile(`./packages.json`)
console.log(content.toString())
