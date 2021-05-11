import {Book} from "../models/book/book.ts"
  
const books = new Map<string, Book>();
  
books.set("1234", {
  id: "1234",
  title: "The Hound of the Baskervilles",
  author: "Conan Doyle, Author",
});


const getBook=()=>Array.from(books.values());

const getBookById= (id:string)=>books.get(id);


const hasBookById= (id:string)=>books.has(id);

const postBook=(id:string,book:Book)=>books.set(id, book)

export {getBook,getBookById,postBook,hasBookById}