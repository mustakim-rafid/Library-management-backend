import { Router } from "express";
import { createBorrowBook, getBorrowedBooksSummary } from "../controllers/borrow.controller";

const borrowRouter = Router()

borrowRouter.route("/").post(createBorrowBook)
borrowRouter.route("/").get(getBorrowedBooksSummary)

export {
    borrowRouter
}