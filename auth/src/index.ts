import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = 8000;
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});