import express, { Request, Response } from "express"
import cors from "cors"

const app = express()

app.use(
    cors({
        origin: [
            'http://localhost:5173',
            `${process.env.ORIGIN_CORS}`
        ]
    })
)

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Library Management System"
    })
});

import { bookRouter } from "./app/routes/book.route"
app.use("/api/books", bookRouter)

import { borrowRouter } from "./app/routes/borrow.route"
app.use("/api/borrow", borrowRouter)

export {
    app
}


