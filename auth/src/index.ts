import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/notFoundError';

const app = express();
app.set('trust proxy', true); // app is being proxied using nginx so let express know it's secure.
const PORT = 8080;
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

// For routes that does not exist
app.all('*', () => {
    throw new NotFoundError();
});

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error)
    }
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });
}; 

start();
