import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import express from 'express';
dotenv.config();

import routes from './routes/index.js';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 10010;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
