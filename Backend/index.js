import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { route } from './Routes/route.js';
import 'dotenv/config';
import connectDB from './Db/index.js';

const server = express();
const PORT = process.env.PORT || 8000;

// CORS configuration
server.use(cors({
  origin: process.env.CORS_ORIGIN, // Single string, no array
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow common headers
}));

server.use(cookieParser());
server.use(express.json({ limit: '16kb' }));
server.use(express.urlencoded({ extended: true }));

// Connect to DB and start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log('Server is running at ' + PORT);
    });
  })
  .catch((error) => {
    console.log('Error connecting::index.js', error);
  });

server.use('/api', route);

server.get('/', (req, res) => {
  res.send('Hello to backend');
});

server.get('*', (req, res) => {
  res.send("404 NOT FOUND <a href='./'> Go To Home</a>");
});