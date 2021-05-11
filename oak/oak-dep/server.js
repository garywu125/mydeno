/*
 OAK : A middleware framework for Deno’s http server, including a router middleware.

 The middleware is processed as a stack, where each middleware function can control the flow of the response. 
 When the middleware is called, it is passed a context and reference to the "next" method in the stack.

 article : https://www.codinghub.net/article/rest-api-using-deno
           https://kreuzwerker.de/en/post/creating-a-simple-rest-api-in-deno
           
          *** https://github.com/ieazie/advertisement-publisher-service
 goal:
      deps.ts + router module + controller (for each router)
 */
 import { Application} from "./deps.ts";  
 import router from'./routes.js';

 // Importing some console colors
import {
  bold,
  cyan,
  green,
  yellow,
} from "https://deno.land/std@0.93.0/fmt/colors.ts";

const app = new Application();
const port = 3000;


function notFound(context) {
  context.response.status = Status.NotFound;
  context.response.body =
    `<html><body><h1>404 - Not Found</h1><p>Path <code>${context.request.url}</code> not found.`;
}

 

// Logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    // console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    console.log(
      `${green(ctx.request.method)} ${cyan(ctx.request.url.pathname)} - ${
        bold(
          String(rt),
        )
      }`,
    );
  });
  
  // Response time
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  });

 // use 一個路由器實體 router from ./router.js 
// app.use(errorHandler); 

// Error handler
app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      context.response.status = err.status;
      const { message, status, stack } = err;
      if (context.request.accepts("json")) {
        context.response.body = { message, status, stack };
        context.response.type = "json";
      } else {
        context.response.body = `${status} ${message}\n\n${stack ?? ""}`;
        context.response.type = "text/plain";
      }
    } else {
      console.log(err);
      throw err;
    }
  }
});

// Use the router
app.use(router.routes());
app.use(router.allowedMethods());


// A basic 404 page
app.use(notFound);

app.addEventListener("listen", ({ secure,hostname, port, serverType }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(
    bold("Start listening on ") + yellow(`${url}`),
  );
  // console.log(bold("  using HTTP server: " + yellow(serverType)));
});



await app.listen({
  port: 3000,
  secure: false,  
});
console.log(bold("Finished."));

// app.listen({ port });
// console.log(`localhost:${port}`);

//  https server
// await app.listen({
//   port: 8000,
//   secure: true,
//   certFile: "./examples/tls/localhost.crt",
//   keyFile: "./examples/tls/localhost.key",
// });


