import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
        super();

        // Add code below because we are extending a base class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}