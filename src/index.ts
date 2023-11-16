import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { userRouter } from './user/user.router';
import { voucherRouter } from './voucher/voucher.router';
import { uservoucherRouter } from './user_voucher/user_voucher.router';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/voucher', voucherRouter);
app.use('/api/user_voucher', uservoucherRouter);
// app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);    
});

