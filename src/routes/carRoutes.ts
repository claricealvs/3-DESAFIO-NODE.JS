import { Router } from 'express';

import { CarController } from '../api/controllers/CarController';

const router = Router();
const carController = new CarController();

router.get('/car/:id', carController.getCarById.bind(carController));
router.get('/car', carController.getAllCars.bind(carController));
router.post('/car', carController.createCar.bind(carController));
router.put('/car/:id', carController.updateCar.bind(carController));

export default router;
