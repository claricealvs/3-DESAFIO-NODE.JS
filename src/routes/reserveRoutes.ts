import { Router } from 'express';
import { ReserveController } from '../api/controllers/ReserveController';
import { authMiddleware } from '../api/middlewares/authMiddleware';

const router = Router();
const reserveController = new ReserveController();

router.post('/reserve', authMiddleware, reserveController.createReserve);

router.get(
  '/reserve',
  reserveController.getAllReserves.bind(reserveController),
);

router.get('/reserve/:id', authMiddleware, reserveController.getReserveById);

router.put('/reserve/:id', authMiddleware, reserveController.updateReserve);

router.delete('/reserve/:id', authMiddleware, reserveController.deleteReserve);

export default router;
