import express from "express"

const app = express()

app.use(express.json())

import { bookRouter } from "./app/routes/book.route"
app.use("/api/books", bookRouter)

import { borrowRouter } from "./app/routes/borrow.route"
app.use("/api/borrow", borrowRouter)

export {
    app
}


