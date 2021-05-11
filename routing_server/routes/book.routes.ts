
import {RouterContext,Status} from "../deps.ts"
import notFound from "../middleware/notFound.ts"
import {Book} from "../models/book/book.ts"
import * as bookService from "../services/book.service.ts"
// interface Book {
//     id: string;
//     title: string;
//     author: string;
//   }
  
  // const books = new Map<string, Book>();
  
  // books.set("1234", {
  //   id: "1234",
  //   title: "The Hound of the Baskervilles",
  //   author: "Conan Doyle, Author",
  // });

  const getBook = (context:any) => {
    context.response.body =bookService.getBook();
  }

  const getBookById=(context:any) => {
    if (context.params && bookService.hasBookById(context.params.id)) {
      context.response.body = bookService.getBookById(context.params.id);
    } else {
      return notFound(context);
    }
  }


  const postBook=async (context: RouterContext) => {
    console.log("post book");
    if (!context.request.hasBody) {
      context.throw(Status.BadRequest, "Bad Request");
    }
    const body = context.request.body();
    let book: Partial<Book> | undefined;
    if (body.type === "json") {
      book = await body.value;
    } else if (body.type === "form") {
      book = {};
      for (const [key, value] of await body.value) {
        book[key as keyof Book] = value;
      }
    } else if (body.type === "form-data") {
      const formData = await body.value.read();
      book = formData.fields;
    }
    if (book) {
      context.assert(book.id && typeof book.id === "string", Status.BadRequest);
      // books.set(book.id, book as Book);
      bookService.postBook(book.id, book as Book);
      context.response.status = Status.OK;
      context.response.body = book;
      context.response.type = "json";
      return;
    }
    context.throw(Status.BadRequest, "Bad Request");
  }

  // const books = new Map<string, Book>();
  
  // books.set("1234", {
  //   id: "1234",
  //   title: "The Hound of the Baskervilles",
  //   author: "Conan Doyle, Author",
  // });

  // const getBook = (context:any) => {
  //   context.response.body = Array.from(books.values());
  // }

  // const getBookById=(context:any) => {
  //   if (context.params && books.has(context.params.id)) {
  //     context.response.body = books.get(context.params.id);
  //   } else {
  //     return notFound(context);
  //   }
  // }


  // const postBook=async (context: RouterContext) => {
  //   console.log("post book");
  //   if (!context.request.hasBody) {
  //     context.throw(Status.BadRequest, "Bad Request");
  //   }
  //   const body = context.request.body();
  //   let book: Partial<Book> | undefined;
  //   if (body.type === "json") {
  //     book = await body.value;
  //   } else if (body.type === "form") {
  //     book = {};
  //     for (const [key, value] of await body.value) {
  //       book[key as keyof Book] = value;
  //     }
  //   } else if (body.type === "form-data") {
  //     const formData = await body.value.read();
  //     book = formData.fields;
  //   }
  //   if (book) {
  //     context.assert(book.id && typeof book.id === "string", Status.BadRequest);
  //     books.set(book.id, book as Book);
  //     context.response.status = Status.OK;
  //     context.response.body = book;
  //     context.response.type = "json";
  //     return;
  //   }
  //   context.throw(Status.BadRequest, "Bad Request");
  // }

  export { getBook, getBookById, postBook };