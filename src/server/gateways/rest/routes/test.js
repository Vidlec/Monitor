import express from 'express';
import { testController } from '../controllers';

const router = express.Router();

router.post('/', testController.post);

export default router;
