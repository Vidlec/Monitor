import express from 'express';
import alerts from './alerts';

const router = express.Router();
router.use('/alerts', alerts);

export default router;
