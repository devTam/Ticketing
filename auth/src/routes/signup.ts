import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";
import { DbConnectionError } from "../errors/dbConnectionError";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please provide a valid Email!"),
    body("password")
      .trim()
      .isLength({ min: 7 })
      .withMessage("Password must be at least 7 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log("creating a user");
    res.send({});
  }
);

export { router as signupRouter };
