import express from 'express';
import { getAllEmpanadas, createEmpanada, updateEmpanada, deleteEmpanada } from '../controllers/empanadasController.js';

export const router = express.Router();

router.get('/empanadas', getAllEmpanadas);
router.post('/empanada', createEmpanada);
router.put('/empanada/:id', updateEmpanada);
router.delete('/empanada/:id', deleteEmpanada);