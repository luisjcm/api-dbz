import express from 'express';
import personajesRoutes from './routes/personajes.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Dragon Ball estructurada');
});

// Usamos el archivo de rutas (el prefijo /api/personajes se aplica a todas)
app.use('/api/personajes', personajesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});