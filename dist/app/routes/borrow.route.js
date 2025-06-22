"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = require("express");
const borrow_controller_1 = require("../controllers/borrow.controller");
const borrowRouter = (0, express_1.Router)();
exports.borrowRouter = borrowRouter;
borrowRouter.route("/").post(borrow_controller_1.createBorrowBook);
borrowRouter.route("/").get(borrow_controller_1.getBorrowedBooksSummary);
