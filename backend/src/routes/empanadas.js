import express from 'express';
import { getAllEmpanadas } from '../controllers/empanadasController.js';

export const router = express.Router();

router.get('/empanadas', getAllEmpanadas);


