import { Router } from 'express';

import { CarController } from '../api/controllers/CarController';

const router = Router();
const carController = new CarController();

router.post('/car', carController.createCar.bind(carController));

export default router;
