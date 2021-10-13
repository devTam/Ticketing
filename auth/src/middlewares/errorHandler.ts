import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from '../errors/requestValidationError';
import { DbConnectionError } from '../errors/dbConnectionError'; 

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
     if (err instanceof RequestValidationError) {
          const formattedErrors  = err.errors.map(error => {
               return {
                    message: error.msg,
                    field: error.param
               }
          })
          return res.status(400).send({ errors: formattedErrors})
     }

     if (err instanceof DbConnectionError) {
          return res.status(500).send({ errors: [
               { message: err.reason }
          ] })
     }

     res.status(400).send({ errors: [
          { message: 'Something went wrong!' }
     ] })
}