import express from 'express';
import { managementController } from '../controllers';

const router = express.Router();

router.post('/rules/reload', managementController.rulesReload);

export default router;
