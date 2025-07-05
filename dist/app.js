"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        `${process.env.ORIGIN_CORS}`
    ]
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        message: "Library Management System"
    });
});
const book_route_1 = require("./app/routes/book.route");
app.use("/api/books", book_route_1.bookRouter);
const borrow_route_1 = require("./app/routes/borrow.route");
app.use("/api/borrow", borrow_route_1.borrowRouter);
