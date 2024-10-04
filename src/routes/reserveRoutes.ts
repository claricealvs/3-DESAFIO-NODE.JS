import { Router } from 'express';

import { ReserveController } from '../api/controllers/ReserveController';

const router = Router();
const reserveController = new ReserveController();

router.post(
  '/reserve',
  reserveController.createReserve.bind(reserveController),
);

export default router;
