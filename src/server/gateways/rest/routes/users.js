import express from 'express';
import { usersController } from '../controllers';

const router = express.Router();

const fakeController = (req, res, next) => {
  res.json(req.body || req.params);
};

// Single user
router.get('/:id', usersController.get);
router.put('/:id', fakeController);
router.patch('/:id', fakeController);
router.delete('/:id', fakeController);

// Users
router.get('/', usersController.getAll);
router.put('/', fakeController);
router.post('/', usersController.add);
router.delete('/', fakeController);

export default router;
