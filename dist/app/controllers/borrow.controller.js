"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedBooksSummary = exports.createBorrowBook = void 0;
const borrow_model_1 = require("../models/borrow.model");
const apiError_1 = require("../utils/apiError");
const book_model_1 = require("../models/book.model");
const zod_1 = require("zod");
const borrowZodSchema = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z.number(),
    dueDate: zod_1.z.string()
});
const createBorrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowDetails = borrowZodSchema.parse(req.body);
        const savedBorrowBook = yield borrow_model_1.Borrow.create(borrowDetails);
        book_model_1.Book.upsateAvailableFieldStatic(savedBorrowBook.book);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: savedBorrowBook
        });
    }
    catch (error) {
        res.status(500).json((0, apiError_1.ApiError)(false, error.message, error));
    }
});
exports.createBorrowBook = createBorrowBook;
const getBorrowedBooksSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booksSummary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: {
                        $sum: "$quantity"
                    }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                    pipeline: [
                        {
                            $project: {
                                title: 1,
                                isbn: 1
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    book: {
                        title: {
                            $arrayElemAt: ["$bookDetails.title", 0]
                        },
                        isbn: {
                            $arrayElemAt: ["$bookDetails.isbn", 0]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: 1
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: booksSummary
        });
    }
    catch (error) {
        res.status(500).json((0, apiError_1.ApiError)(false, error.message, error));
    }
});
exports.getBorrowedBooksSummary = getBorrowedBooksSummary;
