import { Router } from 'express';
import * as controller from '../controllers/appController.js';
import Authenticate from '../middleware/auth.js';

const router = Router();

/** POST */
router.route('/register').post(controller.register);
router.route('/auth').post((req, res) => res.end());
router.route('/login').post(controller.verifyUser, controller.login);

/** GET */
router.route('/user/:username').get(controller.getUser);

/** PUT */
router.route('/edit').put(Authenticate, controller.edit);

export default router;
