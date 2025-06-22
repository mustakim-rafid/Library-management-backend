import { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { ApiError } from "../utils/apiError";
import { Book } from "../models/book.model";
import { z } from "zod";

const borrowZodSchema = z.object({
    book: z.string(),
    quantity: z.number(),
    dueDate: z.string()
})

const createBorrowBook = async (req: Request, res: Response) => {
    try {
        const borrowDetails = borrowZodSchema.parse(req.body)

        const savedBorrowBook = await Borrow.create(borrowDetails)

        Book.upsateAvailableFieldStatic(savedBorrowBook.book)
        
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: savedBorrowBook
        })
    } catch (error: any) {
        res.status(500).json(
            ApiError(false, error.message, error)
        )
    }
}

const getBorrowedBooksSummary = async (req: Request, res: Response) => {
    try {
        const booksSummary = await Borrow.aggregate([
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
        ])

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: booksSummary
        })
    } catch (error: any) {
        res.status(500).json(
            ApiError(false, error.message, error)
        )
    }
}

export {
    createBorrowBook,
    getBorrowedBooksSummary
}