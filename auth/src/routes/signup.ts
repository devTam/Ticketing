import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/badRequestError";
import { RequestValidationError } from "../errors/requestValidationError";
import { User } from "../models/user";

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email already in use!');
    }

    const user = new User({ email, password });
    await user.save();
    // generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email,
    }, 'asdf');

    // store it on session object
    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  }
);

export { router as signupRouter };
