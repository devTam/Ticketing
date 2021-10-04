import express from 'express';
import { json } from 'body-parser';

const app = express();
const PORT = 8000;
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    res.send('Hi there!');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});