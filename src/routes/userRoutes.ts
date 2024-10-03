import { Router } from 'express';

import { UserController } from '../api/controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/user', userController.createUser.bind(userController));
router.get('/user', userController.getAllusers.bind(userController));

export default router;
