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
exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const apiError_1 = require("../utils/apiError");
const zod_1 = require("zod");
const bookZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean()
});
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookDetails = bookZodSchema.parse(req.body);
        const book = yield book_model_1.Book.create(bookDetails);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        res.status(500).json((0, apiError_1.ApiError)(false, error.message, error));
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        let books;
        if (filter && sortBy === "createdAt" && sort && limit) {
            books = yield book_model_1.Book.find({
                genre: filter
            }).sort({
                createdAt: sort
            }).limit(Number(limit));
        }
        else {
            books = yield book_model_1.Book.find().limit(10);
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        res.status(500).json((0, apiError_1.ApiError)(false, error.message, error));
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield book_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        });
    }
    catch (error) {
        res.status(500).json((0, apiError_1.ApiError)(false, error.message, error));
    }
});
exports.getBookById = getBookById;
const updateBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updates = req.body;
        const updatedBook = yield book_model_1.Book.findOneAndUpdate({
            _id: id,
        }, {
            $set: updates
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        });
    }
    catch (error) {
        res.status(500).json((0, apiError_1.ApiError)(false, error.message, error));
    }
});
exports.updateBookById = updateBookById;
const deleteBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        yield book_model_1.Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.status(500).json((0, apiError_1.ApiError)(false, error.message, error));
    }
});
exports.deleteBookById = deleteBookById;
