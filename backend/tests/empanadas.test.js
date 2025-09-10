import { pool } from '../src/db/pool.js';
import request from 'supertest';
import express from 'express';
import { router as empanadasRouter } from '../src/routes/empanadas.js';
import { describe, expect, it } from '@jest/globals';

const app = express();
app.use(express.json());
app.use('/api', empanadasRouter);

afterAll(async () => {
  await pool.end();
});

describe('Empanadas API', () => {
  it('GET /api/empanadas debe responder con message y empanadas (array)', async () => {
    const res = await request(app).get('/api/empanadas');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Consulta Exitosa');
    expect(res.body).toHaveProperty('empanadas');
    expect(Array.isArray(res.body.empanadas)).toBe(true);
  });

  it('POST /api/empanada debe crear una empanada y responder con id y message', async () => {
    const nueva = { name: 'Test', type: 'Horno', filling: 'Test', price: 1000, is_sold_out: false };
    const res = await request(app).post('/api/empanada').send(nueva);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('message', 'Empanada creada exitosamente');
  });

  it('DELETE /api/empanada/:id debe eliminar una empanada', async () => {
    const nueva = { name: 'Borrar', type: 'Frita', filling: 'Queso', price: 1200, is_sold_out: false };
    const crear = await request(app).post('/api/empanada').send(nueva);
    const id = crear.body.id;
    const res = await request(app).delete(`/api/empanada/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Empanada eliminada');
  });
});
