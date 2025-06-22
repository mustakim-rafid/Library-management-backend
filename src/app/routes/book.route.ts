import { Router } from "express";
import { createBook, deleteBookById, getAllBooks, getBookById, updateBookById } from "../controllers/book.controller";

const bookRouter = Router()

bookRouter.route("/").post(createBook)
bookRouter.route("/").get(getAllBooks)
bookRouter.route("/:bookId").get(getBookById)
bookRouter.route("/:bookId").put(updateBookById)
bookRouter.route("/:bookId").delete(deleteBookById)

export {
    bookRouter
}