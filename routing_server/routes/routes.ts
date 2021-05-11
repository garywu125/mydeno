import {Router,RouterContext,Status} from "../deps.ts"
// import notFound from "../middleware/notFound.ts"
import * as bookRoutes from "./book.routes.ts"

// interface Book {
//     id: string;
//     title: string;
//     author: string;
//   }
  
//   const books = new Map<string, Book>();
  
//   books.set("1234", {
//     id: "1234",
//     title: "The Hound of the Baskervilles",
//     author: "Conan Doyle, Author",
//   });


const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  

router  
  .get("/book", bookRoutes.getBook)
  .post("/book", bookRoutes.postBook)
  .get<{ id: string }>("/book/:id", bookRoutes.getBookById);  

// router  
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

  export { router };