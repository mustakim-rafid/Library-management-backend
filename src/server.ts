import dotenv from "dotenv"
import { dbConnect } from "./app/db";
import { app } from "./app";
import { Request, Response } from "express";

const port = 3000

dotenv.config({
    path: "./.env"
})

dbConnect()
    .then(() => {
        app.listen(port, () => {
            console.log(`⚙️  Example app listening on port ${port}`)
        })
    })
    .catch(() => {
        console.log("Database connection failed!")
    })