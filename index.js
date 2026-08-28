import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

const personajes = [
  { id: 1, name: "Goku", raza: "Saiyajin", powerLevel: 9001 },
  { id: 2, name: "Vegeta", raza: "Saiyajin", powerLevel: 8500 },
  { id: 3, name: "Gohan", raza: "Saiyajin", powerLevel: 7000 },
  { id: 4, name: "Piccolo", raza: "Namekiano", powerLevel: 6000 },
];

// Endpoint 1: Ruta raíz de bienvenida
app.get('/', (req, res) => { 
    res.send('Bienvenido a la API de Dragon Ball');
});

// Endpoint 2: Obtener todos los personajes
app.get('/api/personajes', (req, res) => {
    res.json(personajes);
});

// Endpoint 3: Obtener un personaje específico por ID
app.get('/api/personajes/:id', (req, res) => {
    // Extraemos el ID de la URL y lo convertimos a número
    const idBuscado = parseInt(req.params.id);
    const personaje = personajes.find(p => p.id === idBuscado);

    if(personaje) {
        res.json(personaje);
    } else {
        res.status(404).json({ message: "Personaje no encontrado en este universo  " });
    }
});

// Endpoint 4: Crear un nuevo personaje (POST)
app.post('/api/personajes', (req, res) => {
    const nuevoPersonaje = req.body;

    nuevoPersonaje.id = personajes.length ? personajes[personajes.length - 1].id + 1 : 1;

    personajes.push(nuevoPersonaje);

    res.status(201).json({
        message: "Personaje agregado exitosamente",
        personaje: nuevoPersonaje
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});