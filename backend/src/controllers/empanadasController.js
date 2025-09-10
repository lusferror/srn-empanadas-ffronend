import { pool } from '../db/pool.js';

/**
 * This function retrieves all empanadas from the database.
 */
export const getAllEmpanadas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM empanadas');
    res.json({ message: 'Consulta Exitosa', empanadas: rows, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function creates a new empanada in the database.
 * @param {*} req.body 
 * @param {string} [name]
 * @param {string} [type]
 * @param {string} [filling]
 * @param {number} [price]
 * @param {boolean} [is_sold_out]
 */
export const createEmpanada = async (req, res) => {
  try {

    const errors = validateEmpanadaBody(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Los datos ingresados no son válidos', errores: errors });
    }

    const { name, type, filling, price, is_sold_out } = sanitizeBody(req.body);

    const [result] = await pool.query(
      'INSERT INTO empanadas (name, type, filling, price, is_sold_out) VALUES (?, ?, ?, ?, ?)',
      [name, type, filling, price, is_sold_out || false]
    );
    console.log('Creando empanada:', JSON.stringify(req.body));
    res.status(201).json({ id: result.insertId, message: 'Empanada creada exitosamente', success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function updates an existing empanada in the database.
 * @param {*} req.params.id - ID of the empanada to update
 * @param {*} req.body - Fields to update 
 * @param {string} [name]
 * @param {string} [type]
 * @param {string} [filling]
 * @param {number} [price]
 * @param {boolean} [is_sold_out]
 * 
 */
export const updateEmpanada = async (req, res) => {
  try {
    const { id } = req.params;

    const errors = validateEmpanadaBody(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Los datos ingresados no son válidos', errores: errors });
    }

    const { name, type, filling, price, is_sold_out } = req.body;
    console.log('Datos recibidos para actualización:', req.body);
    const sanitizedBody = sanitizeBody(req.body);
    let query = 'UPDATE empanadas SET ';
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud no puede estar vacío' });
    }
    console.log('Cuerpo de la solicitud:', sanitizedBody);
    Object.keys(sanitizedBody).forEach(key => {
      const value = sanitizedBody[key];
      if (key === 'is_sold_out' && (Boolean(value) === true || Boolean(value) === false)) {
        query += `${key}=${+value == 1 ? 1 : 0}, `;
      } else {
        query += `${key}='${value}', `;
      }
    });
    query = query.slice(0, -2);
    query += ` WHERE id=${id}`;

    console.log('Query de actualización:', query);
    console.log('Actualizando empanada con id:', id);
    await pool.query(query, [name, type, filling, price, is_sold_out, id]);

    const [emapanda] = await pool.query(
      ` SELECT  
          name, type, filling, price, is_sold_out
        FROM empanadas WHERE id=?`,
      [id]);

    res.json({ message: 'Empanada actualizada', emapanda, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * This function deletes an empanada from the database.
 * @param {number|string} req.params.id - ID of the empanada to delete
 */
export const deleteEmpanada = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM empanadas WHERE id=?', [id]);
    console.log('Eliminando empanada con id:', id);

    res.json({ message: 'Empanada eliminada', success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const validateEmpanadaBody = (body) => {
  const { name, type, filling, price, is_sold_out } = body;
  const errors = [];
  if (name && typeof name !== 'string') errors.push('El campo "name" debe ser de tipo texto');
  if (type && typeof type !== 'string') errors.push('El campo "type" debe ser de tipo texto');
  if (filling && typeof filling !== 'string') errors.push('El campo "filling" debe ser de tipo texto');
  if (price && typeof price !== 'number') errors.push('El campo "price" debe ser un número');
  if (is_sold_out && typeof is_sold_out !== 'boolean') errors.push('el campo "is_sold_out" debe ser un valor booleano');
  return errors;
}

const sanitizeBody = (body) => {
  const { name, type, filling, price, is_sold_out } = body;
  const sanitized = {};
  if (name) sanitized.name = name.toLowerCase().trim();
  if (type) sanitized.type = type;
  sanitized.filling = filling.toLowerCase().trim() ?? '';
  if (price) sanitized.price = parseFloat(price);
  if (is_sold_out !== undefined) sanitized.is_sold_out = is_sold_out ? 1 : 0;
  return sanitized;
}
