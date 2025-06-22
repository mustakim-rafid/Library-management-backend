import mongoose, { Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator: async function(v) {
                const book = await Book.findById(this.book)
                const availableCopies = book?.copies
                return v <= availableCopies!
            },
            message: "Sorry, {VALUE} copies are not available"
        },
        min: [1, "0 and negative integers are not valid input"]
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

borrowSchema.pre("save", async function(next) {
    await Book.findByIdAndUpdate(
        this.book,
        {
            $inc: {
                copies: -this.quantity
            }
        }
    )

    next()
})

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema)