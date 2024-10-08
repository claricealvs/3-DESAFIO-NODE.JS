import { Router } from 'express';
import { ReserveController } from '../api/controllers/ReserveController';

const router = Router();
const reserveController = new ReserveController();

router.post('/reserve', reserveController.createReserve);

router.get(
  '/reserve',
  reserveController.getAllReserves.bind(reserveController),
);

router.get('/reserve/:id', reserveController.getReserveById);

router.put('/reserve/:id', reserveController.updateReserve);

router.delete('/reserve/:id', reserveController.deleteReserve);

export default router;
