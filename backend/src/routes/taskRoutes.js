const express = require('express');
const { check } = require('express-validator');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(
    protect,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('estimatedMinutes', 'Estimated minutes is required and must be a number').isNumeric()
    ],
    createTask
  );

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
