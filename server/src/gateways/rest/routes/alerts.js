import express from 'express';
import { alertsController } from '../controllers';

const router = express.Router();

router.get('/:id', alertsController.alert);
router.get('/', alertsController.alerts);

export default router;
