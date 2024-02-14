import dotenv from 'dotenv';

dotenv.config({})



import express from 'express'
import { connection } from './db/connection.js';
import userRoutes from './src/modules/user/user.routes.js';
// import messageRoutes from './src/modules/message/message.routes.js';
import { AppError } from './src/utils/AppError.js';
import { globalError } from './src/utils/globalErrorHandle.js';
import cors from "cors"
const app = express()
const port =  3000;

app.use(cors())
app.use(express.json())



connection()
app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/message", messageRoutes)
app.get('/', (req, res) => res.send('Hello World!'))



app.use("*", (req, res, next) => {
    // res.json({ err: `invaild url   ${req.originalUrl}` });
    next(new AppError(`invaild url   ${req.originalUrl}`, 404));
});



// Global error handle
app.use(globalError);


// 100-199
// 200-299
// 300-399
// 400-499
// 500-599








app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))