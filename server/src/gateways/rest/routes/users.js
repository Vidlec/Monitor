import express from 'express';

const router = express.Router();

const fakeController = (req, res, next) => {
  res.json(req.body || req.params);
};

// Single user
router.get('/:id', fakeController);
router.put('/:id', fakeController);
router.patch('/:id', fakeController);
router.delete('/:id', fakeController);

// Users
router.get('/', fakeController);
router.put('/', fakeController);
router.post('/', fakeController);
router.delete('/', fakeController);

export default router;
