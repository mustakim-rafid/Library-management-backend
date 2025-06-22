import mongoose from "mongoose";

export function ApiError(success: boolean = false, message: string, err: any) {
    if (err instanceof mongoose.Error.ValidationError) {
        return {
            success,
            message,
            error: {
                name: err.name,
                errors: err.errors
            }
        }
    } else {
        return {
            success,
            message,
            error: err
        }
    }
}