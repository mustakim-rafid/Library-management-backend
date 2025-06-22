"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
const book_route_1 = require("./app/routes/book.route");
app.use("/api/books", book_route_1.bookRouter);
const borrow_route_1 = require("./app/routes/borrow.route");
app.use("/api/borrow", borrow_route_1.borrowRouter);
