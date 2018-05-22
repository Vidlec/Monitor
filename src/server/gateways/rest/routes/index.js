import express from 'express';

import alerts from './alerts';
import comments from './comments';
import users from './users';

const router = express.Router();
router.use('/alerts', alerts);
router.use('/comments', comments);
router.use('/users', users);

export default router;
