import { Request, Response } from "express";
import { Book } from "../models/book.model";
import { ApiError } from "../utils/apiError";
import { SortOrder } from "mongoose";
import { z } from "zod";

const bookZodSchema = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    isbn: z.string(),
    description: z.string().optional(),
    copies: z.number(),
    available: z.boolean()
})

const createBook = async (req: Request, res: Response) => {
    try {
        const bookDetails = bookZodSchema.parse(req.body)

        const book = await Book.create(bookDetails)

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error: any) {
        res.status(500).json(
            ApiError(false, error.message, error)
        )
    }
}

const getAllBooks = async (req: Request, res: Response) => {
    try {
        const {filter, sortBy, sort, limit} = req.query

        let books
        if (filter && sortBy === "createdAt" && sort && limit) {
            books = await Book.find({
                genre: filter
            }).sort({
                createdAt: sort as SortOrder
            }).limit(Number(limit))
        } else {
            books = await Book.find().limit(10)
        }

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })
    } catch (error: any) {
        res.status(500).json(
            ApiError(false, error.message, error)
        )
    }
}

const getBookById = async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId
    
        const book = await Book.findById(id)
        
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch (error: any) {
        res.status(500).json(
            ApiError(false, error.message, error)
        )
    }
} 

const updateBookById = async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId
        const updates = req.body

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            {
                $set: updates
            },
            {
                new: true,
                runValidators: true
            }
        )

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        })
    } catch (error: any) {
        res.status(500).json(
            ApiError(false, error.message, error)
        )
    }
}

const deleteBookById = async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId

        await Book.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error: any) {
        res.status(500).json(
            ApiError(false, error.message, error)
        )
    }
}

export {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
}