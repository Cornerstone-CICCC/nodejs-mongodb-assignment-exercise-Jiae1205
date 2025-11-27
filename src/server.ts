// src/server.ts

import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';

// .env 파일 로드
dotenv.config();

// Express App 생성
const app: Application = express();

// Middleware (JSON 파싱)
app.use(express.json());

// 기본 라우트 (테스트용)
app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

// Product 라우트 연결
app.use('/products', productRoutes);

// 포트 설정 (.env 또는 기본값 3000)
const PORT = process.env.PORT || 3000;

// MongoDB 연결
const mongoUri = process.env.DATABASE_URI as string;

if (!mongoUri) {
  console.error("ERROR: DATABASE_URI is missing in .env file");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
