import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser  from 'cookie-parser';
import dotenv from 'dotenv'; dotenv.config();
import discordRoute from './route/discordRoute.js';
import userRoute from './route/userRoute.js';
import errorHandler from './middleware/errorHandler.js';
import connectMongoDB from './config/mongoDb.js';
import orderRoute from './route/orderRoute.js';

const PORT = process.env.PORT || 5000;
const app = express();
connectMongoDB();

app.use(cors({
  // origin: "https://www.shadowgg.com",
  // origin: "http://localhost:3000",
  origin: ['https://www.shadowgg.com', 'http://localhost:3000'],
  credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/discord', discordRoute);
app.use('/api/user', userRoute);
app.use('/api/order', orderRoute);


app.use(errorHandler);
  

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
