import express, { Request, Response } from "express"

const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Library Management System</h1>")
});

import { bookRouter } from "./app/routes/book.route"
app.use("/api/books", bookRouter)

import { borrowRouter } from "./app/routes/borrow.route"
app.use("/api/borrow", borrowRouter)

export {
    app
}


