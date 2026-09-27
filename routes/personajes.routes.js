import { Router } from 'express';
import { 
  obtenerTodos, 
  obtenerPorId, 
  crearPersonaje, 
  actualizarPersonaje, 
  eliminarPersonaje 
} from '../controllers/personajes.controllers.js';

const router = Router();

router.get('/', obtenerTodos);
router.get('/:id', obtenerPorId);
router.post('/', crearPersonaje);
router.put('/:id', actualizarPersonaje);
router.delete('/:id', eliminarPersonaje);

export default router;