/*
 * This is an example of a server that utilizes the router.
 */

// Importing some console colors
import {
    bold,
    cyan,
    green,
    yellow,
    Application,
    Context,
    isHttpError,
    
  } from "./deps.ts";
  
  import notFound from "./middleware/notFound.ts"
  import errorHandler from "./middleware/errorHandler.ts"
  import { router } from "./routes/routes.ts";
   
  // interface Book {
  //   id: string;
  //   title: string;
  //   author: string;
  // }
  
  // const books = new Map<string, Book>();
  
  // books.set("1234", {
  //   id: "1234",
  //   title: "The Hound of the Baskervilles",
  //   author: "Conan Doyle, Author",
  // });
  
   
  // const router = new Router();
  // router
  //   .get("/", (context) => {
  //     context.response.body = "Hello world!";
  //   })
  //   .get("/book", (context) => {
  //     context.response.body = Array.from(books.values());
  //   })
  //   .post("/book", async (context: RouterContext) => {
  //     console.log("post book");
  //     if (!context.request.hasBody) {
  //       context.throw(Status.BadRequest, "Bad Request");
  //     }
  //     const body = context.request.body();
  //     let book: Partial<Book> | undefined;
  //     if (body.type === "json") {
  //       book = await body.value;
  //     } else if (body.type === "form") {
  //       book = {};
  //       for (const [key, value] of await body.value) {
  //         book[key as keyof Book] = value;
  //       }
  //     } else if (body.type === "form-data") {
  //       const formData = await body.value.read();
  //       book = formData.fields;
  //     }
  //     if (book) {
  //       context.assert(book.id && typeof book.id === "string", Status.BadRequest);
  //       books.set(book.id, book as Book);
  //       context.response.status = Status.OK;
  //       context.response.body = book;
  //       context.response.type = "json";
  //       return;
  //     }
  //     context.throw(Status.BadRequest, "Bad Request");
  //   })
  //   .get<{ id: string }>("/book/:id", (context) => {
  //     if (context.params && books.has(context.params.id)) {
  //       context.response.body = books.get(context.params.id);
  //     } else {
  //       return notFound(context);
  //     }
  //   });
  
  const app = new Application();
  
  // Logger
  app.use(async (context, next) => {
    await next();
    const rt = context.response.headers.get("X-Response-Time");
    console.log(
      `${green(context.request.method)} ${
        cyan(decodeURIComponent(context.request.url.pathname))
      } - ${
        bold(
          String(rt),
        )
      }`,
    );
  });
  
  // Response Time
  app.use(async (context, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
  });
  
  // Error handler
  app.use(errorHandler)  
  
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
    console.log(bold("  using HTTP server: " + yellow(serverType)));
  });

  await app.listen({ hostname: "127.0.0.1", port: 3000 });
  console.log(bold("Finished."));