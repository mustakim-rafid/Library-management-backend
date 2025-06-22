"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./app/db");
const app_1 = require("./app");
const port = 5000;
dotenv_1.default.config({
    path: "./.env"
});
(0, db_1.dbConnect)()
    .then(() => {
    app_1.app.listen(port, () => {
        console.log(`⚙️  Example app listening on port ${port}`);
    });
})
    .catch(() => {
    console.log("Database connection failed!");
});
