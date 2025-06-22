"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = ApiError;
const mongoose_1 = __importDefault(require("mongoose"));
function ApiError(success = false, message, err) {
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        return {
            success,
            message,
            error: {
                name: err.name,
                errors: err.errors
            }
        };
    }
    else {
        return {
            success,
            message,
            error: err
        };
    }
}
