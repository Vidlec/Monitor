import express from 'express';
import { alertsController } from '../controllers';

const router = express.Router();

router.get('/:id', alertsController.get);
router.post('/', alertsController.post);
router.get('/', alertsController.getAll);

export default router;
