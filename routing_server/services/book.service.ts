import * as bookRepo from "../repositories/book.repository.ts";
import {Book} from "../models/book/book.ts"

const getBook=()=>bookRepo.getBook()

const getBookById= (id:string)=>bookRepo.getBookById(id);

const postBook=(id:string,book:Book)=>bookRepo.postBook(id, book)

const hasBookById= (id:string)=>bookRepo.hasBookById(id);

export {getBook,getBookById,postBook,hasBookById}