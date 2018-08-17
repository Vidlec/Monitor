import express from 'express';

import alerts from './alerts';
import comments from './comments';
import users from './users';
import test from './test';

const router = express.Router();
router.use('/alerts', alerts);
router.use('/comments', comments);
router.use('/users', users);
router.use('/test', test);

export default router;
