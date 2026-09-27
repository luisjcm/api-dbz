import { pool } from '../db.js';

export const obtenerTodos = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM personajes ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
};

export const obtenerPorId = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM personajes WHERE id = $1', [parseInt(req.params.id)]);
    rows.length > 0 ? res.json(rows[0]) : res.status(404).json({ message: "No encontrado" });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const crearPersonaje = async (req, res) => {
  try {
    const { name, raza, powerLevel } = req.body; // Asegúrate de que coincida con lo que envías en el POST
    const { rows } = await pool.query(
      'INSERT INTO personajes (nombre, raza, ki) VALUES ($1, $2, $3) RETURNING *',
      [name, raza, powerLevel]
    );
    res.status(201).json({ message: "Creado", personaje: rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar' });
  }
};

export const actualizarPersonaje = async (req, res) => {
  try {
    const { nombre, raza, ki } = req.body;
    const { rows } = await pool.query(
      'UPDATE personajes SET nombre = $1, raza = $2, ki = $3 WHERE id = $4 RETURNING *',
      [nombre, raza, ki, parseInt(req.params.id)]
    );
    rows.length > 0 ? res.json({ message: "Actualizado", personaje: rows[0] }) : res.status(404).json({ message: "No encontrado" });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
};

export const eliminarPersonaje = async (req, res) => {
  try {
    const { rows } = await pool.query('DELETE FROM personajes WHERE id = $1 RETURNING *', [parseInt(req.params.id)]);
    rows.length > 0 ? res.json({ message: "Eliminado", personaje: rows[0] }) : res.status(404).json({ message: "No encontrado" });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};