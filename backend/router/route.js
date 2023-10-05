import { Router } from 'express';
import * as controller from '../controllers/appController.js';

const router = Router();

/** POST */
router.route('/register').post(controller.register);
router.route('/auth').post((req, res) => res.end());
router.route('/login').post(controller.login);

/** GET */
router.route('/user/:username').get(controller.getUser);

/** PUT */
router.route('/edit').put(controller.editUser);

export default router;
