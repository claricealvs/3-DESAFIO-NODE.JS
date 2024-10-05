import { Router } from 'express';

import { ReserveController } from '../api/controllers/ReserveController';

const router = Router();
const reserveController = new ReserveController();

router.post(
  '/reserve',
  reserveController.createReserve.bind(reserveController),
);

router.get(
  '/reserve',
  reserveController.getAllReserves.bind(reserveController),
);

router.get(
  '/reserve/:id',
  reserveController.getReserveById.bind(reserveController),
);

router.put(
  '/reserve/:id',
  reserveController.updateReserve.bind(reserveController),
);

export default router;
