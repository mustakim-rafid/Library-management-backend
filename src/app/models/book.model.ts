import mongoose, { Model, Schema, Types } from "mongoose";
import { IBook } from "../interfaces/book.interface";

interface BookModelType extends Model<IBook> {
  upsateAvailableFieldStatic(id: Types.ObjectId): void;
}

const bookSchema = new Schema<IBook, BookModelType>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: "Invalid genre input, got {VALUE}"
        }
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    copies: {
        type: Number,
        required: true,
        min: [0, "Negative integers are not allowed! got {VALUE}"]
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
})

bookSchema.static("upsateAvailableFieldStatic", async function upsateAvailableFieldStatic(id: Types.ObjectId) {
    const book = await this.findById(id)
    if (book?.copies === 0) {
        await this.findByIdAndUpdate(id, { available: false })
    }
})

bookSchema.pre("save", function(next) {
    if (this.copies === 0) {
        this.available = false
    }
    next()
})

export const Book = mongoose.model<IBook, BookModelType>("Book", bookSchema)
