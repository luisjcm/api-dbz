import express from 'express';
import { pool } from './db.js'; // Importamos la conexión a la base de datos

const app = express();
const PORT = 3000;

app.use(express.json());

// Endpoint 1: Ruta raíz de bienvenida
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Dragon Ball conectada a PostgreSQL');
});

// Endpoint 2: Obtener todos los personajes
app.get('/api/personajes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM personajes ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// Endpoint 3: Obtener un personaje específico por ID
app.get('/api/personajes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { rows } = await pool.query('SELECT * FROM personajes WHERE id = $1', [id]);

    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: "Personaje no encontrado en este universo" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Endpoint 4: Crear un nuevo personaje (POST)
app.post('/api/personajes', async (req, res) => {
  try {
    const { name, raza, powerLevel } = req.body;
    const query = 'INSERT INTO personajes (nombre, raza, ki) VALUES ($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(query, [name, raza, powerLevel]);

    res.status(201).json({
      message: "Personaje agregado exitosamente",
      personaje: rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar el personaje' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});