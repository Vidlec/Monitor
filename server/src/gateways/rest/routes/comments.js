import express from 'express';
import { commentsController } from '../controllers';

const router = express.Router();

const fakeController = (req, res, next) => {
  res.json(req.body || req.params);
};

// Single comment
router.get('/:id', commentsController.get);
router.put('/:id', fakeController);
router.patch('/:id', fakeController);
router.delete('/:id', fakeController);

// Comments
router.get('/', commentsController.getAll);
router.put('/:id', fakeController);
router.post('/', commentsController.add);
router.delete('/', fakeController);

export default router;
