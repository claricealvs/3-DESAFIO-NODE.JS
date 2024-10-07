import { Router } from 'express';
import { AuthController } from '../api/controllers/AuthController';
import { UserController } from '../api/controllers/UserController';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/user', userController.createUser.bind(userController));
router.post('/auth', authController.login.bind(authController));
router.get('/user', userController.getAllusers.bind(userController));
router.get('/user/:id', userController.getUserById.bind(userController));
router.put('/user/:id', userController.updateUser.bind(userController));
router.delete('/user/:id', userController.deleteUser.bind(userController));

export default router;
