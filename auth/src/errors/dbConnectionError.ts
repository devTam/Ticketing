import { ValidationError } from "express-validator";

export class DbConnectionError extends Error {
    reason = 'Error connecting to database';
    constructor() {
        super();

        Object.setPrototypeOf(this, DbConnectionError.prototype);
    }
}