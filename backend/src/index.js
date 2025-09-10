import { initDb } from './db/pool.js';
import express from 'express';
import cors from 'cors';
import { router as  empanadasRouter } from './routes/empanadas.js';
import { basicAuthenticacion } from './middlewares/basicAuthenticacion.js';

const app = express();

initDb();

app.use(cors());
app.use(express.json());

app.use('/api',basicAuthenticacion,  empanadasRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
