import express from 'express';
import cors from 'cors';
import { basicAuthentication } from './middlewares/basicAuthentication.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', basicAuthentication, (req, res) => {
  res.json({ message: 'API is working', success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});