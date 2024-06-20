import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import userRoutes from './routes/user.js'

const app = express();
dotenv.config()

app.use(bodyParser.json());
app.use(cors())


// routes
app.use('/api', userRoutes);


app.listen(7000, () => {
    console.log("server listening on port 7000");
});
