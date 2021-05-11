// oak : A middleware framework for Deno’s http server, including a router middleware.
//
// The middleware is processed as a stack, where each middleware function can control the flow of the response. 
// When the middleware is called, it is passed a context and reference to the "next" method in the stack.
//
// https://blog.poychang.net/build-deno-web-app-with-oak/

import { Application } from "https://deno.land/x/oak/mod.ts";


const app = new Application();



// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Hello World!
// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });



await app.listen({ port: 8000 });